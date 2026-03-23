import Link from "next/link";

import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata = {
  title: "개인정보처리방침",
  description: `${siteConfig.name} 문의 접수용 개인정보처리방침 안내`,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    url: absoluteUrl("/privacy"),
    title: `${siteConfig.name} 개인정보처리방침`,
    description: `${siteConfig.name} 문의 접수용 개인정보처리방침 안내`,
  },
};

const policySections = [
  {
    title: "1. 수집하는 개인정보 항목",
    items: ["이름", "연락처", "상담 분야", "상담 내용"],
  },
  {
    title: "2. 개인정보 수집 및 이용 목적",
    items: ["상담 문의 접수", "문의 내용 확인 및 회신", "상담 진행을 위한 연락"],
  },
  {
    title: "3. 개인정보 보유 및 이용 기간",
    items: ["문의 확인 및 회신 후 지체 없이 파기합니다."],
  },
  {
    title: "4. 개인정보 제3자 제공 및 처리위탁",
    items: [
      "개인정보를 제3자에게 제공하지 않습니다.",
      "문의 메일 전송을 위해 메일 전송 서비스를 사용할 수 있습니다.",
    ],
  },
  {
    title: "5. 동의 거부 권리 및 불이익",
    items: ["개인정보 수집 및 이용에 대한 동의를 거부할 수 있으나, 문의 접수가 제한될 수 있습니다."],
  },
  {
    title: "6. 정정 및 삭제 요청",
    items: [
      `정정 및 삭제 요청은 ${siteConfig.email}로 접수할 수 있습니다.`,
      `대표 연락처: ${siteConfig.phone}`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="subpage-shell">
      <section className="subpage-hero">
        <p className="section-label">Privacy Policy</p>
        <h1>개인정보처리방침</h1>
        <p>
          {siteConfig.name}는 상담 문의 접수와 회신을 위한 최소한의 개인정보만 수집합니다.
        </p>
        <p className="subpage-hero__subcopy">
          문의 접수 페이지 기준 안내이며, 문의 확인 및 회신 후 지체 없이 파기합니다.
        </p>
        <div className="subpage-actions">
          <Link className="ghost-button ghost-button--dark" href="/">
            메인으로 돌아가기
          </Link>
          <a className="primary-button" href={`mailto:${siteConfig.email}`}>
            운영 메일로 문의하기
          </a>
        </div>
      </section>

      <section className="article-panel policy-panel">
        <div className="policy-summary">
          <strong>{siteConfig.name}</strong>
          <p>
            문의 접수 후 24시간 이내 연락드리며, 문의 목적이 끝나면 개인정보를 별도로 보관하지 않습니다.
          </p>
        </div>

        <div className="policy-sections">
          {policySections.map((section) => (
            <section className="policy-section" key={section.title}>
              <h2>{section.title}</h2>
              <ul className="policy-list">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
