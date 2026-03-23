import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import InquiryForm from "@/components/InquiryForm";
import { boardCategories } from "@/data/boards";
import { buildInquiryHref, getBoardInquiryPrefill } from "@/lib/inquiry";
import { hasInquiryNotificationConfig } from "@/lib/inquiry-service";
import { absoluteUrl, siteConfig } from "@/lib/site";

const solutionCards = [
  {
    title: "의사 개인 보험",
    text: "현재 보장 구조를 보고 필요한 방향만 정리합니다.",
    boardSlug: "doctor-life",
    inquiryHref: buildInquiryHref({
      needType: "의사 개인 생명보험",
      message: "의사 개인 보장 점검 상담을 문의드립니다.",
    }),
  },
  {
    title: "법인보험 구조 상담",
    text: "대표와 임원 보장, 법인보험 구조를 함께 봅니다.",
    boardSlug: "corporate-insurance",
    inquiryHref: buildInquiryHref({
      needType: "법인보험",
      message: "법인보험 구조 상담을 문의드립니다.",
    }),
  },
  {
    title: "상속 · 증여 대비",
    text: "가족 보호와 자금 이전 관점에서 필요한 흐름을 봅니다.",
    boardSlug: "estate-tax",
    inquiryHref: buildInquiryHref({
      needType: "상속 · 증여 대비",
      message: "상속 · 증여 대비 상담을 문의드립니다.",
    }),
  },
];

const profileItems = [
  "의사 · 법인 VIP 중심",
  "생명보험 · 법인보험 상담",
  "문의 후 24시간 내 연락",
];

const processItems = [
  {
    title: "문의 접수",
    text: "이름과 연락처, 상담 내용만 남겨주시면 됩니다.",
  },
  {
    title: "연락",
    text: "접수 내용을 확인한 뒤 직접 연락드립니다.",
  },
  {
    title: "상담",
    text: "전화 또는 필요 시 대면 상담으로 이어집니다.",
  },
];

const proofItems = [
  "홍준혁 직접 상담",
  "신한라이프 소속",
  "롯데월드타워 상담 가능",
];

const contactItems = [
  { label: "전화", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/-/g, "")}` },
  { label: "이메일", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { label: "상담 장소", value: siteConfig.address },
];

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: absoluteUrl("/"),
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function Page() {
  const featuredBoards = boardCategories.filter((category) =>
    ["doctor-life", "corporate-insurance", "estate-tax"].includes(category.slug),
  );
  const isInquiryFormAvailable = hasInquiryNotificationConfig();

  return (
    <main className="page-shell">
      <header className="site-header">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true">
            <span className="brand-mark__shield" />
            <span className="brand-mark__core" />
          </div>
          <div>
            <p className="brand-eyebrow">Shinhan Life Premium Advisory</p>
            <h1 className="brand-title">{siteConfig.name}</h1>
          </div>
        </div>
        <nav className="site-nav" aria-label="주요 메뉴">
          <a href="#services">주요 상담</a>
          <a href="#profile">홍준혁</a>
          <Link href="/boards">브리핑</Link>
          <a href="#contact">문의</a>
        </nav>
      </header>

      <section className="hero-panel">
        <div className="hero-copy">
          <p className="section-label">MAP Private Advisory</p>
          <h2>
            의사와 법인 VIP를 위한
            <br />
            보험 상담
          </h2>
          <p className="hero-text">
            현재 보장 구조를 보고 필요한 방향을 정리합니다.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#contact">
              상담 문의하기
            </a>
            <Link className="ghost-button" href="/boards">
              브리핑 보기
            </Link>
          </div>
          <ul className="hero-proof-list">
            {proofItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <aside className="hero-card">
          <p className="hero-card__eyebrow">Lead Advisor</p>
          <h3>{siteConfig.consultantName}</h3>
          <p className="hero-card__lead">
            {siteConfig.affiliation} · {siteConfig.name}
          </p>
          <p>
            현재 보장 구조를 함께 보고 필요한 준비만 간단히 정리합니다.
          </p>
          <ul className="detail-list">
            <li>
              <strong>연락처</strong>
              <span>
                <a className="detail-link" href={`tel:${siteConfig.phone.replace(/-/g, "")}`}>
                  {siteConfig.phone}
                </a>
              </span>
            </li>
            <li>
              <strong>이메일</strong>
              <span>
                <a className="detail-link" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
              </span>
            </li>
            <li>
              <strong>상담 장소</strong>
              <span>{siteConfig.address}</span>
            </li>
            <li>
              <strong>상담 안내</strong>
              <span>문의 접수 후 24시간 이내 연락드립니다.</span>
            </li>
          </ul>
          <div className="hero-card__actions">
            <a className="ghost-button ghost-button--dark" href={`tel:${siteConfig.phone.replace(/-/g, "")}`}>
              전화 바로하기
            </a>
            <a className="ghost-button ghost-button--dark" href="#contact">
              문의 폼 이동
            </a>
          </div>
        </aside>
      </section>

      <section className="content-grid" id="services">
        <div className="section-heading">
          <div>
            <p className="section-label">Consultation Focus</p>
            <h2>자주 찾는 상담</h2>
          </div>
          <p>많이 찾는 주제만 먼저 정리했습니다.</p>
        </div>
        <div className="service-grid">
          {solutionCards.map((service, index) => (
            <article className="service-card service-card--compact" key={service.title}>
              <p className="service-card__eyebrow">
                Focus {String(index + 1).padStart(2, "0")}
              </p>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <div className="service-card__actions">
                <Link className="board-link" href={`/boards/${service.boardSlug}`}>
                  브리핑 보기
                </Link>
                <Link className="text-link" href={service.inquiryHref}>
                  이 주제로 문의
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="profile-highlight" id="profile">
        <div className="profile-copy">
          <p className="section-label">Lead Advisor</p>
          <h2>홍준혁 상담</h2>
          <p>
            문의 내용을 먼저 듣고 필요한 방향을 정리합니다.
          </p>
        </div>
        <div className="advisor-stack">
          <article className="profile-feature-card">
            <div className="profile-portrait profile-portrait--lead">
              <Image
                src="/images/consultants/hong-junhyuk-portrait.jpg"
                alt="MAP컨설팅 홍준혁 상담사"
                fill
                sizes="(max-width: 860px) 100vw, 36vw"
                className="profile-image"
              />
            </div>
            <div className="profile-feature-card__body">
              <p className="profile-badge">Shinhan Life Advisory</p>
              <h3>{siteConfig.consultantName}</h3>
              <p className="profile-role">
                {siteConfig.affiliation} · {siteConfig.name}
              </p>
              <ul>
                {profileItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>

          <div className="process-stack">
            {processItems.map((item, index) => (
              <article className="process-card" key={item.title}>
                <p className="process-card__index">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-grid">
        <div className="section-heading section-heading--with-action">
          <div>
            <p className="section-label">Insurance Briefing</p>
            <h2>먼저 읽어보는 브리핑</h2>
          </div>
          <div className="section-heading__actions">
            <Link className="ghost-button ghost-button--dark" href="/boards">
              브리핑 전체 보기
            </Link>
          </div>
        </div>
        <div className="board-grid board-grid--compact">
          {featuredBoards.map((category) => (
            <article className="board-card" key={category.slug}>
              <p className="board-card__eyebrow">{category.eyebrow}</p>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <div className="service-card__actions">
                <Link className="board-link" href={`/boards/${category.slug}`}>
                  카테고리 보기
                </Link>
                <Link
                  className="text-link"
                  href={buildInquiryHref(getBoardInquiryPrefill(category))}
                >
                  이 카테고리로 문의
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-panel" id="contact">
        <div>
          <p className="section-label">Contact</p>
          <h2>문의 남기시면 24시간 이내 연락드립니다.</h2>
          <p>
            이름과 연락처, 상담 내용만 남겨주시면 됩니다.
          </p>
          <ul className="contact-meta">
            {contactItems.map((item) => (
              <li key={item.label}>
                <strong>{item.label}</strong>
                <span>
                  {item.href ? (
                    <a className="detail-link" href={item.href}>
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {isInquiryFormAvailable ? (
          <div className="contact-box contact-box--form">
            <p className="contact-box__title">문의 남기기</p>
            <Suspense fallback={<p className="form-feedback">상담 폼을 불러오는 중입니다.</p>}>
              <InquiryForm />
            </Suspense>
          </div>
        ) : (
          <div className="contact-box contact-box--form">
            <p className="contact-box__title">전화 또는 이메일 문의</p>
            <p className="contact-box__text">
              온라인 문의 연결이 준비되지 않았습니다. 아래 연락처로 문의주시면 직접 안내드립니다.
            </p>
            <div className="contact-box__actions">
              <a className="primary-button" href={`tel:${siteConfig.phone.replace(/-/g, "")}`}>
                전화 문의하기
              </a>
              <a className="ghost-button ghost-button--dark" href={`mailto:${siteConfig.email}`}>
                이메일 문의하기
              </a>
            </div>
          </div>
        )}
      </section>

      <footer className="site-footer">
        <strong>
          {siteConfig.name} · {siteConfig.affiliation}
        </strong>
        <p>
          문의 접수 후 24시간 이내 연락드립니다.
        </p>
        <p>상담 접수를 위한 최소한의 정보만 수집합니다.</p>
        <p className="site-footer__note">
          개인정보 정정 및 삭제 요청:{" "}
          <a className="detail-link" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>{" "}
          · <Link href="/privacy">개인정보처리방침</Link>
        </p>
      </footer>
    </main>
  );
}
