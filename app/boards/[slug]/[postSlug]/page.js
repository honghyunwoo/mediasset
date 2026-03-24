import Link from "next/link";
import { notFound } from "next/navigation";

import {
  formatBoardDate,
  getBoardPost,
  getBoardPostParams,
} from "@/data/boards";
import { buildInquiryHref, getBoardInquiryPrefill } from "@/lib/inquiry";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return getBoardPostParams();
}

export async function generateMetadata({ params }) {
  const { slug, postSlug } = await params;
  const result = getBoardPost(slug, postSlug);

  if (!result) {
    return {
      title: "보험 브리핑",
    };
  }

  return {
    title: result.post.title,
    description: result.post.summary,
    alternates: {
      canonical: `/boards/${slug}/${postSlug}`,
    },
    openGraph: {
      url: absoluteUrl(`/boards/${slug}/${postSlug}`),
      title: `${result.post.title} | ${result.category.title}`,
      description: result.post.summary,
    },
  };
}

function renderContentBlock(block, index) {
  if (block.type === "heading") {
    return (
      <h2 className="article-content__heading" key={`${block.type}-${index}`}>
        {block.text}
      </h2>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="article-content__list" key={`${block.type}-${index}`}>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <p className="article-content__paragraph" key={`${block.type}-${index}`}>
      {block.text}
    </p>
  );
}

export default async function BoardPostPage({ params }) {
  const { slug, postSlug } = await params;
  const result = getBoardPost(slug, postSlug);

  if (!result) {
    notFound();
  }

  const { category, post } = result;

  return (
    <main className="subpage-shell">
      <section className="subpage-hero">
        <p className="section-label">{category.shortTitle}</p>
        <div className="board-post-card__meta board-post-card__meta--hero">
          <span>{post.tag}</span>
          <span>{formatBoardDate(post.date)}</span>
          <span>{post.authorName}</span>
        </div>
        <h1>{post.title}</h1>
        <p>{post.summary}</p>
        <div className="subpage-actions">
          <Link
            className="primary-button"
            href={buildInquiryHref(getBoardInquiryPrefill(category, post))}
          >
            문의 남기기
          </Link>
          <Link className="ghost-button ghost-button--dark" href={`/boards/${category.slug}`}>
            같은 카테고리 보기
          </Link>
        </div>
      </section>

      <article className="article-panel">
        <div className="article-content">
          {post.content.map((block, index) => renderContentBlock(block, index))}
        </div>
      </article>

      <section className="board-cta-panel">
        <p className="section-label">문의하기</p>
        <h2>내용을 읽고 끝내기보다, 현재 구조에 맞게 직접 점검해 보는 쪽이 더 빠를 수 있습니다.</h2>
        <p>
          문의를 남겨주시면 접수 후 24시간 이내 연락드리고, 현재 상황에 맞는 상담 방향을 먼저 정리해 드립니다.
        </p>
        <div className="subpage-actions">
          <Link
            className="primary-button"
            href={buildInquiryHref(getBoardInquiryPrefill(category, post))}
          >
            문의 남기기
          </Link>
          <Link className="ghost-button ghost-button--dark" href={`/boards/${category.slug}`}>
            브리핑 목록으로 돌아가기
          </Link>
        </div>
      </section>
    </main>
  );
}
