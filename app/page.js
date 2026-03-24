import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import InquiryForm from "@/components/InquiryForm";
import { boardCategories } from "@/data/boards";
import { buildInquiryHref } from "@/lib/inquiry";
import { hasInquiryNotificationConfig } from "@/lib/inquiry-service";
import { absoluteUrl, siteConfig } from "@/lib/site";

const consultationItems = [
  {
    title: "의사 개인 보장",
    text: "생명보험과 현재 보장 구조를 먼저 봅니다.",
    href: buildInquiryHref({
      needType: "의사 개인 보장",
      message: "의사 개인 보장 점검 상담을 문의드립니다.",
    }),
  },
  {
    title: "법인보험 · 임원보장",
    text: "대표와 임원 보장, 법인보험 구조를 정리합니다.",
    href: buildInquiryHref({
      needType: "법인보험 · 임원보장",
      message: "법인보험 구조 상담을 문의드립니다.",
    }),
  },
  {
    title: "상속 · 증여 · 자금 연계",
    text: "상속·증여, 승계, 자금 흐름을 함께 봅니다.",
    href: buildInquiryHref({
      needType: "상속 · 증여 · 자금 연계",
      message: "상속 · 증여 · 자금 연계 상담을 문의드립니다.",
    }),
  },
];

const trustItems = [
  `${siteConfig.consultantName} 직접 상담`,
  `${siteConfig.affiliation} 소속`,
  "문의 후 24시간 내 연락",
];

const advisorHighlights = [
  "생명보험과 법인보험 구조 점검",
  "상속·증여, 승계, 자금 흐름 연결",
];

const partnerCards = [
  {
    label: "법인보험",
    title: "대표와 임원 보장을 함께 봅니다.",
    text: "법인 운영과 대표 보장을 따로 보지 않고, 실제 보호 구조가 맞는지 같이 점검합니다.",
    href: buildInquiryHref({
      needType: "법인보험 · 임원보장",
      message: "법인보험과 임원보장 구조 상담을 문의드립니다.",
    }),
  },
  {
    label: "상속 · 증여",
    title: "가족 보호와 승계 흐름을 함께 정리합니다.",
    text: "상속·증여 이슈를 따로 떼지 않고, 실제 자금 흐름과 보호 목적까지 같이 설명합니다.",
    href: buildInquiryHref({
      needType: "상속 · 증여 · 자금 연계",
      message: "상속·증여와 승계 흐름 상담을 문의드립니다.",
    }),
  },
  {
    label: "세무 · 자금",
    title: "세금과 자금 이슈도 보험 상담 안에서 연결합니다.",
    text: "부동산세금, 법인세, 자금 흐름처럼 함께 봐야 하는 주제는 상담 안에서 연결해 정리합니다.",
    href: buildInquiryHref({
      needType: "기존 보험 점검",
      message: "세무·자금 연계 관점에서 보험 구조 상담을 문의드립니다.",
    }),
  },
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
  const featuredBriefing = boardCategories.find((category) => category.slug === "doctor-life") || boardCategories[0];
  const featuredBriefingPost = featuredBriefing.posts[0];
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
            <p className="brand-eyebrow">신한라이프 상담 파트너</p>
            <h1 className="brand-title">{siteConfig.name}</h1>
          </div>
        </div>
        <nav className="site-nav" aria-label="주요 메뉴">
          <a href="#consultations">상담</a>
          <a href="#advisor">홍준혁</a>
          <a href="#contact">문의</a>
        </nav>
        <a className="header-cta" href="#contact">
          문의
        </a>
      </header>

      <section className="hero-panel hero-panel--simple">
        <div className="hero-copy hero-copy--simple">
          <p className="section-label">보험 중심 자문</p>
          <h2>
            의사·법인 VIP를 위한
            <br />
            보험 중심 상담
          </h2>
          <p className="hero-text">
            {siteConfig.consultantName}이 직접 상담합니다. 생명보험과 법인보험을 기준으로 법인 보장, 상속·증여, 승계 흐름까지 함께 정리합니다.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#contact">
              문의 남기기
            </a>
            <a className="hero-secondary-link" href={`tel:${siteConfig.phone.replace(/-/g, "")}`}>
              전화 상담
            </a>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="기본 신뢰 정보">
        {trustItems.map((item) => (
          <p className="trust-strip__item" key={item}>
            {item}
          </p>
        ))}
      </section>

      <section className="content-grid consultation-section" id="consultations">
        <div className="consultation-heading">
          <p className="section-label">자주 찾는 상담</p>
          <h2>의사 개인, 법인보험, 승계 준비를 먼저 봅니다.</h2>
          <p>보험 상담을 중심으로 필요한 범위를 함께 연결합니다.</p>
        </div>
        <div className="consultation-list">
          {consultationItems.map((item, index) => (
            <Link className="consultation-item" href={item.href} key={item.title}>
              <span className="consultation-item__index">{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="contact-panel" id="contact">
        <div>
          <p className="section-label">문의하기</p>
          <h2>의사·법인 보험 상담을 남겨주세요.</h2>
          <p>문의 내용은 짧게 적어주셔도 됩니다. 확인 후 직접 연락드립니다.</p>
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
            <p className="contact-box__title">빠른 상담 안내</p>
            <p className="contact-box__text">
              전화 또는 이메일로 문의주시면 확인 후 24시간 내 직접 연락드립니다.
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

      <section className="advisor-panel" id="advisor">
        <div className="advisor-panel__media">
          <div className="profile-portrait profile-portrait--lead">
            <Image
              src="/images/consultants/hong-junhyuk-portrait.jpg"
              alt="MAP컨설팅 홍준혁 상담사"
              fill
              sizes="(max-width: 900px) 100vw, 36vw"
              className="profile-image"
            />
          </div>
        </div>
        <div className="advisor-panel__copy">
          <p className="section-label">홍준혁 직접 상담</p>
          <h2>현재 보장 구조부터 함께 봅니다.</h2>
          <p className="advisor-panel__lead">
            현재 보장 구조를 기준으로 법인보험, 상속·증여, 승계 흐름을 함께 살피는 방식으로 상담합니다.
          </p>
          <ul className="advisor-panel__highlights">
            {advisorHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="advisor-panel__meta">
            <p>
              <strong>이름</strong>
              <span>{siteConfig.consultantName}</span>
            </p>
            <p>
              <strong>소속</strong>
              <span>{siteConfig.affiliation}</span>
            </p>
            <p>
              <strong>대표 연락</strong>
              <span>
                <a className="detail-link" href={`tel:${siteConfig.phone.replace(/-/g, "")}`}>
                  {siteConfig.phone}
                </a>
              </span>
            </p>
            <p>
              <strong>상담 장소</strong>
              <span>{siteConfig.address}</span>
            </p>
          </div>
          <a className="ghost-button ghost-button--dark advisor-panel__action" href="#contact">
            문의로 바로 이동
          </a>
        </div>
      </section>

      <section className="content-grid partner-section">
        <div className="consultation-heading">
          <p className="section-label">함께 보는 영역</p>
          <h2>보험 상담은 여기까지 연결됩니다.</h2>
          <p>법인, 승계, 세무와 자금 흐름처럼 함께 봐야 하는 주제는 같은 흐름 안에서 정리합니다.</p>
        </div>
        <div className="expert-grid">
          {partnerCards.map((card) => (
            <article className="expert-card" key={card.title}>
              <p className="section-label">{card.label}</p>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <Link className="text-link" href={card.href}>
                이 내용으로 문의하기
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="briefing-teaser">
        <div>
          <p className="section-label">상담 전 참고</p>
          <h2>필요한 주제만 따로 읽어보세요.</h2>
          <p>{featuredBriefingPost.title}처럼 보험, 법인, 상속 관련 내용을 따로 정리해 두었습니다.</p>
        </div>
        <div className="briefing-teaser__actions">
          <p className="briefing-teaser__meta">{featuredBriefing.title}</p>
          <Link className="ghost-button ghost-button--dark" href="/boards">
            브리핑 전체 보기
          </Link>
        </div>
      </section>

      <footer className="site-footer">
        <strong>
          {siteConfig.name} · {siteConfig.affiliation}
        </strong>
        <p>문의 접수 후 24시간 이내 연락드립니다.</p>
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
