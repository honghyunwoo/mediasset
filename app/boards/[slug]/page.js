import Link from "next/link";
import { notFound } from "next/navigation";

import { boardCategories, formatBoardDate, getBoardCategory } from "@/data/boards";
import { buildInquiryHref, getBoardInquiryPrefill } from "@/lib/inquiry";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return boardCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getBoardCategory(slug);

  if (!category) {
    return {
      title: "보험 브리핑",
    };
  }

  return {
    title: category.title,
    description: category.description,
    alternates: {
      canonical: `/boards/${slug}`,
    },
    openGraph: {
      url: absoluteUrl(`/boards/${slug}`),
      title: `${category.title} | MAP컨설팅`,
      description: category.description,
    },
  };
}

export default async function BoardCategoryPage({ params }) {
  const { slug } = await params;
  const category = getBoardCategory(slug);

  if (!category) {
    notFound();
  }

  return (
    <main className="subpage-shell">
      <section className="subpage-hero">
        <p className="section-label">{category.shortTitle}</p>
        <h1>{category.title}</h1>
        <p>{category.description}</p>
        <p className="subpage-hero__subcopy">
          등록 글 {category.posts.length}건
        </p>
        <div className="subpage-actions">
          <Link
            className="primary-button"
            href={buildInquiryHref(getBoardInquiryPrefill(category))}
          >
            문의 남기기
          </Link>
          <Link className="ghost-button ghost-button--dark" href="/boards">
            브리핑 목록
          </Link>
        </div>
      </section>

      <section className="board-category-list">
        {category.posts.map((post) => (
          <article className="board-post-card" key={post.title}>
            <div className="board-post-card__meta">
              <span>{post.tag}</span>
              <span>{formatBoardDate(post.date)}</span>
            </div>
            <h2>
              <Link
                className="board-post-card__title-link"
                href={`/boards/${category.slug}/${post.slug}`}
              >
                {post.title}
              </Link>
            </h2>
            <p>{post.summary}</p>
            <div className="board-post-card__actions">
              <Link className="board-link" href={`/boards/${category.slug}/${post.slug}`}>
                자세히 보기
              </Link>
              <Link
                className="text-link"
                href={buildInquiryHref(getBoardInquiryPrefill(category, post))}
              >
                이 주제로 문의하기
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="board-cta-panel">
        <p className="section-label">문의하기</p>
        <h2>읽어본 뒤 지금 구조를 직접 점검해보는 쪽이 더 빠를 수 있습니다.</h2>
        <p>
          고객 유형과 현재 고민을 남겨주시면 접수 후 24시간 이내 연락드리고 상담 방향을 먼저 안내해 드리겠습니다.
        </p>
        <div className="subpage-actions">
          <Link
            className="primary-button"
            href={buildInquiryHref(getBoardInquiryPrefill(category))}
          >
            문의 남기기
          </Link>
          <Link className="ghost-button ghost-button--dark" href="/boards">
            다른 브리핑 보기
          </Link>
        </div>
      </section>
    </main>
  );
}
