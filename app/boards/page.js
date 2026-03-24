import Link from "next/link";

import { boardCategories } from "@/data/boards";
import { buildInquiryHref, getBoardInquiryPrefill } from "@/lib/inquiry";
import { absoluteUrl } from "@/lib/site";

export const metadata = {
  title: "상담 전 참고 브리핑",
  description:
    "의사 보험, 법인보험, 상속·증여·자금 연계 등 주요 상담 주제를 정리한 MAP컨설팅 브리핑입니다.",
  alternates: {
    canonical: "/boards",
  },
  openGraph: {
    url: absoluteUrl("/boards"),
    title: "상담 전 참고 브리핑 | MAP컨설팅",
    description: "의사 보험, 법인보험, 상속·증여·자금 연계 등 주요 상담 주제를 정리한 MAP컨설팅 브리핑입니다.",
  },
};

export default function BoardsPage() {
  return (
    <main className="subpage-shell">
      <section className="subpage-hero">
        <p className="section-label">상담 전 참고</p>
        <h1>상담 전 참고 브리핑</h1>
        <p>
          의사 보험, 법인보험, 상속·증여·자금 연계까지 자주 묻는 주제만 모았습니다.
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
            <p className="section-label">{category.shortTitle}</p>
            <h2>{category.title}</h2>
            <p>{category.description}</p>
            <p className="board-hub-card__count">등록 글 {category.posts.length}건</p>
            <div className="board-post-card__actions">
              <Link className="board-link" href={`/boards/${category.slug}`}>
                브리핑 보기
              </Link>
              <Link
                className="text-link"
                href={buildInquiryHref(getBoardInquiryPrefill(category))}
              >
                문의 남기기
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
