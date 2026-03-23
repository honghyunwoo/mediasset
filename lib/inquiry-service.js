import { appendFile, mkdir } from "fs/promises";
import path from "path";

import { google } from "googleapis";

import { siteConfig } from "@/lib/site";

const SHEET_RANGE = process.env.GOOGLE_SHEET_RANGE || "Inquiries!A:M";
const SHEET_NAME = SHEET_RANGE.split("!")[0] || "Inquiries";
const SHEETS_SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const RESEND_ENDPOINT = "https://api.resend.com/emails";

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
    inquiryId: crypto.randomUUID(),
    reference: createReference(now),
    status: "new",
    notificationStatus: "pending",
    name: String(body.name || "").trim(),
    clientType: String(body.clientType || "").trim(),
    organizationName: String(body.organizationName || "").trim(),
    phone: normalizePhone(String(body.phone || "")),
    email: String(body.email || "").trim(),
    needType: String(body.needType || "").trim(),
    policyStatus: String(body.policyStatus || "").trim(),
    referralSource: String(body.referralSource || "").trim(),
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
    return "개인정보 수집 및 연락 동의가 필요합니다.";
  }

  return null;
}

function getSheetsConfig() {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!spreadsheetId || !clientEmail || !privateKey) {
    return null;
  }

  return {
    spreadsheetId,
    clientEmail,
    privateKey,
  };
}

function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_NOTIFY_FROM;
  const to = process.env.INQUIRY_NOTIFY_TO || siteConfig.email;

  if (!apiKey || !from || !to) {
    return null;
  }

  return {
    apiKey,
    from,
    to,
  };
}

function createSheetsClient(config) {
  const auth = new google.auth.JWT({
    email: config.clientEmail,
    key: config.privateKey,
    scopes: SHEETS_SCOPES,
  });

  return google.sheets({
    version: "v4",
    auth,
  });
}

function createInquiryRow(inquiry) {
  return [
    inquiry.submittedAt,
    inquiry.reference,
    inquiry.status,
    inquiry.name,
    inquiry.clientType,
    inquiry.organizationName,
    inquiry.phone,
    inquiry.email,
    inquiry.needType,
    inquiry.policyStatus,
    inquiry.referralSource,
    inquiry.message,
    inquiry.notificationStatus,
  ];
}

function parseUpdatedRowNumber(updatedRange) {
  const match = /![A-Z]+(\d+):[A-Z]+(\d+)/.exec(updatedRange || "");
  return match ? Number(match[1]) : null;
}

async function appendInquiryToSheet(inquiry) {
  const config = getSheetsConfig();

  if (!config) {
    throw new Error("Google Sheets 환경 변수가 설정되지 않았습니다.");
  }

  const sheets = createSheetsClient(config);
  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: config.spreadsheetId,
    range: SHEET_RANGE,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [createInquiryRow(inquiry)],
    },
  });

  return {
    storage: "google-sheets",
    rowNumber: parseUpdatedRowNumber(response.data.updates?.updatedRange),
  };
}

async function updateInquiryNotificationStatus(rowNumber, status) {
  const config = getSheetsConfig();

  if (!config || !rowNumber) {
    return;
  }

  const sheets = createSheetsClient(config);
  await sheets.spreadsheets.values.update({
    spreadsheetId: config.spreadsheetId,
    range: `${SHEET_NAME}!M${rowNumber}`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[status]],
    },
  });
}

async function saveInquiryLocally(inquiry) {
  const inquiryDir = path.join(process.cwd(), "data", "inquiries");
  const inquiryFile = path.join(inquiryDir, "submissions.jsonl");

  await mkdir(inquiryDir, { recursive: true });
  await appendFile(inquiryFile, `${JSON.stringify(inquiry)}\n`, "utf8");

  return {
    storage: "local",
    rowNumber: null,
  };
}

export async function saveInquiry(inquiry) {
  if (getSheetsConfig()) {
    return appendInquiryToSheet(inquiry);
  }

  if (process.env.VERCEL !== "1") {
    return saveInquiryLocally(inquiry);
  }

  throw new Error("문의 저장 환경 변수가 설정되지 않았습니다.");
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

  if (inquiry.clientType) {
    lines.splice(5, 0, `고객 유형: ${inquiry.clientType}`);
  }

  if (inquiry.organizationName) {
    lines.splice(lines.length - 3, 0, `병원명 / 법인명: ${inquiry.organizationName}`);
  }

  if (inquiry.email) {
    lines.splice(lines.length - 3, 0, `이메일: ${inquiry.email}`);
  }

  if (inquiry.policyStatus) {
    lines.splice(lines.length - 3, 0, `현재 보험 상태: ${inquiry.policyStatus}`);
  }

  if (inquiry.referralSource) {
    lines.splice(lines.length - 3, 0, `유입 경로: ${inquiry.referralSource}`);
  }

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

  if (inquiry.clientType) {
    rows.splice(3, 0, ["고객 유형", inquiry.clientType]);
  }

  if (inquiry.organizationName) {
    rows.push(["병원명 / 법인명", inquiry.organizationName]);
  }

  if (inquiry.email) {
    rows.push(["이메일", inquiry.email]);
  }

  if (inquiry.policyStatus) {
    rows.push(["현재 보험 상태", inquiry.policyStatus]);
  }

  if (inquiry.referralSource) {
    rows.push(["유입 경로", inquiry.referralSource]);
  }

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

export async function persistNotificationStatus(storageResult, status) {
  if (storageResult.storage !== "google-sheets" || !storageResult.rowNumber) {
    return;
  }

  await updateInquiryNotificationStatus(storageResult.rowNumber, status);
}
