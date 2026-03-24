"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { siteConfig } from "@/lib/site";

const initialState = {
  name: "",
  phone: "",
  needType: "",
  message: "",
  consent: false,
};

const needTypeAliases = {
  "의사 개인 생명보험": "의사 개인 보장",
  "법인보험": "법인보험 · 임원보장",
  "상속 · 증여 대비": "상속 · 증여 · 자금 연계",
  "부동산세금 · 법인세 연계": "상속 · 증여 · 자금 연계",
};

function normalizeNeedType(value) {
  const trimmed = String(value || "").trim();
  return needTypeAliases[trimmed] || trimmed;
}

async function submitViaFormSubmit(form) {
  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(siteConfig.email)}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: form.name,
      phone: form.phone,
      needType: form.needType,
      message: form.message,
      _subject: `[MAP컨설팅] 새 상담 문의`,
      _template: "table",
    }),
  });

  const result = await response.json();
  const isFailure = String(result.success).toLowerCase() === "false";

  if (!response.ok || isFailure) {
    const message = String(result.message || "");

    if (message.toLowerCase().includes("activation")) {
      throw new Error("운영 메일로 활성화 확인 메일을 보냈습니다. 메일 확인 후 다시 문의를 접수해 주세요.");
    }

    throw new Error(result.message || "문의 전송에 실패했습니다.");
  }

  return result;
}

export default function InquiryForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const prefilledValues = {
      needType: normalizeNeedType(searchParams.get("needType") || ""),
      message: searchParams.get("message") || "",
    };

    if (!Object.values(prefilledValues).some(Boolean)) {
      return;
    }

    setForm((current) => ({
      ...current,
      ...Object.fromEntries(
        Object.entries(prefilledValues).filter(([, value]) => value),
      ),
    }));
    setStatus("idle");
    setFeedback("");
  }, [searchParams]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "상담 문의를 저장하지 못했습니다.");
      }

      setStatus("success");
      setFeedback("문의가 접수되었습니다. 24시간 내 연락드립니다.");
      setForm(initialState);
      return;
    } catch (error) {
      try {
        await submitViaFormSubmit(form);
      } catch (fallbackError) {
        setStatus("error");
        setFeedback(fallbackError.message || "문의를 전송하지 못했습니다.");
        return;
      }
    }

    setStatus("success");
    setFeedback("문의가 접수되었습니다. 24시간 내 연락드립니다.");
    setForm(initialState);
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <div className="inquiry-intro">
        <p className="inquiry-intro__title">간단히 남겨주시면 됩니다.</p>
        <p className="inquiry-intro__text">
          연락처와 상담 내용을 남겨주시면 확인 후 직접 연락드립니다.
        </p>
      </div>

      <div className="inquiry-grid">
        <label className="field">
          <span>이름</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="성함을 입력해 주세요"
            required
          />
        </label>
        <label className="field">
          <span>연락처</span>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="010-0000-0000"
            required
          />
        </label>
        <label className="field">
          <span>상담 분야</span>
          <select name="needType" value={form.needType} onChange={handleChange} required>
            <option value="">선택해 주세요</option>
            <option value="의사 개인 보장">의사 개인 보장</option>
            <option value="법인보험 · 임원보장">법인보험 · 임원보장</option>
            <option value="기존 보험 점검">기존 보험 점검</option>
            <option value="상속 · 증여 · 자금 연계">상속 · 증여 · 자금 연계</option>
          </select>
        </label>
        <label className="field field--full">
          <span>상담 내용</span>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            placeholder="간단히 남겨주세요."
            required
          />
        </label>
      </div>

      <label className="consent-field">
        <input
          type="checkbox"
          name="consent"
          checked={form.consent}
          onChange={handleChange}
          required
        />
        <span>개인정보 수집 및 이용에 동의합니다.</span>
      </label>
      <p className="consent-note">
        수집 항목: 이름, 연락처, 상담 분야, 상담 내용 · 문의 확인 및 회신 후 지체 없이 파기합니다.{" "}
        <Link href="/privacy">개인정보처리방침 보기</Link>
      </p>

      <div className="inquiry-actions">
        <button className="primary-button" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "접수 중..." : "문의 접수하기"}
        </button>
        {feedback ? (
          <p className={`form-feedback form-feedback--${status}`}>{feedback}</p>
        ) : null}
      </div>
    </form>
  );
}
