import { siteConfig } from "@/lib/site";
import nodemailer from "nodemailer";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const RESEND_USER_AGENT = `${siteConfig.domain}-inquiry/1.0`;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export function normalizePhone(value) {
  return value.replace(/[^0-9-]/g, "").trim();
}

export function createReference(date) {
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const suffix = crypto.randomUUID().slice(0, 6).toUpperCase();

  return `MAP-${year}${month}${day}-${suffix}`;
}

export function buildInquiryPayload(body) {
  const now = new Date();

  return {
    reference: createReference(now),
    name: String(body.name || "").trim(),
    phone: normalizePhone(String(body.phone || "")),
    needType: String(body.needType || "").trim(),
    message: String(body.message || "").trim(),
    consent: Boolean(body.consent),
    submittedAt: now.toISOString(),
  };
}

export function validateInquiryPayload(payload) {
  if (
    !payload.name ||
    !payload.phone ||
    !payload.needType ||
    !payload.message
  ) {
    return "필수 항목을 모두 입력해 주세요.";
  }

  if (!payload.consent) {
    return "개인정보 수집 및 이용 동의가 필요합니다.";
  }

  return null;
}

export function hasInquiryNotificationConfig() {
  if (hasFormSubmitConfig()) {
    return true;
  }

  if (hasWeb3FormsConfig()) {
    return true;
  }

  if (hasSmtpConfig()) {
    return true;
  }

  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.INQUIRY_NOTIFY_FROM &&
      (process.env.INQUIRY_NOTIFY_TO || siteConfig.email),
  );
}

function hasFormSubmitConfig() {
  return Boolean(process.env.FORMSUBMIT_EMAIL || siteConfig.email);
}

function getFormSubmitConfig() {
  if (!hasFormSubmitConfig()) {
    return null;
  }

  return {
    targetEmail: process.env.FORMSUBMIT_EMAIL || siteConfig.email,
  };
}

function hasWeb3FormsConfig() {
  return Boolean(process.env.WEB3FORMS_ACCESS_KEY);
}

function getWeb3FormsConfig() {
  if (!hasWeb3FormsConfig()) {
    return null;
  }

  return {
    accessKey: process.env.WEB3FORMS_ACCESS_KEY,
    to: process.env.INQUIRY_NOTIFY_TO || siteConfig.email,
  };
}

function hasSmtpConfig() {
  const hasServiceConfig = Boolean(
    process.env.SMTP_SERVICE &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.INQUIRY_NOTIFY_FROM,
  );

  const hasHostConfig = Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.INQUIRY_NOTIFY_FROM,
  );

  return hasServiceConfig || hasHostConfig;
}

function getSmtpConfig() {
  if (!hasSmtpConfig()) {
    return null;
  }

  return {
    service: process.env.SMTP_SERVICE || undefined,
    host: process.env.SMTP_HOST || undefined,
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined,
    secure:
      typeof process.env.SMTP_SECURE === "string"
        ? process.env.SMTP_SECURE === "true"
        : Number(process.env.SMTP_PORT || "0") === 465,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.INQUIRY_NOTIFY_FROM,
    to: process.env.INQUIRY_NOTIFY_TO || siteConfig.email,
  };
}

async function sendWeb3FormsNotification(inquiry) {
  const config = getWeb3FormsConfig();

  if (!config) {
    return null;
  }

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: config.accessKey,
      subject: buildInquiryEmailSubject(inquiry),
      from_name: siteConfig.name,
      to: config.to,
      name: inquiry.name,
      email: siteConfig.email,
      phone: inquiry.phone,
      needType: inquiry.needType,
      message: buildInquiryEmailText(inquiry),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Web3Forms 전송에 실패했습니다. ${errorText}`);
  }

  const result = await response.json();
  const isFailure = String(result.success).toLowerCase() === "false";

  if (isFailure) {
    throw new Error(`Web3Forms 전송에 실패했습니다. ${result.message || "알 수 없는 오류"}`);
  }

  return {
    status: "sent",
    id: result.message || result.data || null,
  };
}

function getResendConfig() {
  if (
    !(
      process.env.RESEND_API_KEY &&
      process.env.INQUIRY_NOTIFY_FROM &&
      (process.env.INQUIRY_NOTIFY_TO || siteConfig.email)
    )
  ) {
    return null;
  }

  return {
    apiKey: process.env.RESEND_API_KEY,
    from: process.env.INQUIRY_NOTIFY_FROM,
    to: process.env.INQUIRY_NOTIFY_TO || siteConfig.email,
  };
}

async function sendSmtpNotification(inquiry) {
  const config = getSmtpConfig();

  if (!config) {
    return null;
  }

  const transporter = nodemailer.createTransport({
    service: config.service,
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  const result = await transporter.sendMail({
    from: config.from,
    to: config.to,
    subject: buildInquiryEmailSubject(inquiry),
    html: buildInquiryEmailHtml(inquiry),
    text: buildInquiryEmailText(inquiry),
  });

  return {
    status: "sent",
    id: result.messageId || null,
  };
}

function buildInquiryEmailSubject(inquiry) {
  return `[MAP컨설팅] 새 상담 문의 ${inquiry.reference}`;
}

function buildInquiryEmailText(inquiry) {
  const lines = [
    "새 상담 문의가 접수되었습니다.",
    "",
    `접수번호: ${inquiry.reference}`,
    `접수시각: ${inquiry.submittedAt}`,
    `이름: ${inquiry.name}`,
    `연락처: ${inquiry.phone}`,
    `상담 분야: ${inquiry.needType}`,
    "",
    "[상담 내용]",
    inquiry.message,
  ];

  return lines.join("\n");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildInquiryEmailHtml(inquiry) {
  const rows = [
    ["접수번호", inquiry.reference],
    ["접수시각", inquiry.submittedAt],
    ["이름", inquiry.name],
    ["연락처", inquiry.phone],
    ["상담 분야", inquiry.needType],
  ];

  return `
    <div style="font-family:Segoe UI,Pretendard,Noto Sans KR,sans-serif;color:#142033;">
      <h2 style="margin:0 0 18px;font-size:22px;color:#0a1c31;">새 상담 문의가 접수되었습니다.</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #dbe3ec;">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <th style="width:180px;padding:12px 14px;border:1px solid #dbe3ec;background:#f5f8fb;text-align:left;">${escapeHtml(label)}</th>
                  <td style="padding:12px 14px;border:1px solid #dbe3ec;">${escapeHtml(value)}</td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
      <div style="margin-top:18px;padding:16px 18px;border-radius:16px;background:#f5f8fb;border:1px solid #dbe3ec;">
        <strong style="display:block;margin-bottom:8px;color:#0a1c31;">상담 내용</strong>
        <p style="margin:0;line-height:1.7;white-space:pre-wrap;">${escapeHtml(inquiry.message)}</p>
      </div>
    </div>
  `;
}

export async function sendInquiryNotification(inquiry) {
  const web3FormsResult = await sendWeb3FormsNotification(inquiry);

  if (web3FormsResult) {
    return web3FormsResult;
  }

  const smtpResult = await sendSmtpNotification(inquiry);

  if (smtpResult) {
    return smtpResult;
  }

  const config = getResendConfig();

  if (!config) {
    return {
      status: "skipped",
      id: null,
    };
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": RESEND_USER_AGENT,
    },
    body: JSON.stringify({
      from: config.from,
      to: [config.to],
      subject: buildInquiryEmailSubject(inquiry),
      html: buildInquiryEmailHtml(inquiry),
      text: buildInquiryEmailText(inquiry),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`이메일 알림 전송에 실패했습니다. ${errorText}`);
  }

  const result = await response.json();

  return {
    status: "sent",
    id: result.id || null,
  };
}
