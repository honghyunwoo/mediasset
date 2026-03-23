import Link from "next/link";

import { boardCategories } from "@/data/boards";
import { buildInquiryHref, getBoardInquiryPrefill } from "@/lib/inquiry";
import { absoluteUrl } from "@/lib/site";

export const metadata = {
  title: "브리핑",
  description:
    "MAP컨설팅의 주요 상담 주제를 간단히 정리한 브리핑입니다.",
  alternates: {
    canonical: "/boards",
  },
  openGraph: {
    url: absoluteUrl("/boards"),
    title: "브리핑 | MAP컨설팅",
    description: "MAP컨설팅의 주요 상담 주제를 간단히 정리한 브리핑입니다.",
  },
};

export default function BoardsPage() {
  return (
    <main className="subpage-shell">
      <section className="subpage-hero">
        <p className="section-label">Insurance Briefing</p>
        <h1>브리핑</h1>
        <p>
          자주 찾는 주제만 모았습니다.
        </p>
        <div className="subpage-actions">
          <Link className="primary-button" href="/#contact">
            문의 남기기
          </Link>
          <Link className="ghost-button ghost-button--dark" href="/">
            홈으로
          </Link>
        </div>
      </section>

      <section className="board-hub-grid">
        {boardCategories.map((category) => (
          <article className="board-hub-card" key={category.slug}>
            <p className="section-label">{category.eyebrow}</p>
            <h2>{category.title}</h2>
            <p>{category.description}</p>
            <div className="board-post-card__actions">
              <Link className="board-link" href={`/boards/${category.slug}`}>
                브리핑 보기
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
      </section>
    </main>
  );
}
