import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { boardCategories, formatBoardDate, getBoardCategory } from "@/data/boards";
import { buildInquiryHref, getBoardInquiryPrefill } from "@/lib/inquiry";
import { absoluteUrl } from "@/lib/site";

const seminarFieldGallery = [
  {
    src: "/images/field/event-screen.jpg",
    alt: "행사 현장에서 홍준혁 소개 화면과 참석자들이 함께 있는 장면",
    label: "행사 기록",
    title: "행사 현장에서 진행된 소개 장면",
    className: "field-gallery__image--rotate-fix",
  },
  {
    src: "/images/field/event-award.jpg",
    alt: "행사와 시상 장면이 함께 보이는 현장 사진",
    label: "현장 메모",
    title: "세미나 이후 이어진 행사 현장",
    className: "field-gallery__image--rotate-fix",
  },
];

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

  const showSeminarGallery = slug === "seminar-guide";

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

      {showSeminarGallery ? (
        <section className="field-gallery">
          <div className="field-gallery__heading">
            <p className="section-label">현장 사진</p>
            <h2>세미나와 행사 현장도 함께 정리해 두었습니다.</h2>
            <p>과한 소개보다, 실제로 어떤 자리에서 어떤 흐름으로 설명해 왔는지 짧게 확인할 수 있는 기록입니다.</p>
          </div>
          <div className="field-gallery__grid">
            {seminarFieldGallery.map((item) => (
              <figure className="field-gallery__item" key={item.title}>
                <div className="field-gallery__media">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 860px) 100vw, 50vw"
                    className={["field-gallery__image", item.className].filter(Boolean).join(" ")}
                  />
                </div>
                <figcaption className="field-gallery__caption">
                  <span className="field-gallery__label">{item.label}</span>
                  <strong>{item.title}</strong>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

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
