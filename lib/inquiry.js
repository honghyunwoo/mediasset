const boardNeedTypeMap = {
  notice: "기존 보험 점검",
  "doctor-life": "의사 개인 보장",
  "corporate-insurance": "법인보험 · 임원보장",
  "estate-tax": "상속 · 증여 · 자금 연계",
  "seminar-guide": "기존 보험 점검",
};

export function buildInquiryHref(prefill = {}) {
  const params = new URLSearchParams();

  Object.entries(prefill).forEach(([key, value]) => {
    if (typeof value === "string" && value.trim()) {
      params.set(key, value.trim());
    }
  });

  const query = params.toString();
  return query ? `/?${query}#contact` : "/#contact";
}

export function getBoardInquiryPrefill(category, post) {
  const needType = boardNeedTypeMap[category.slug] || "";
  const message = post
    ? `${category.title}의 "${post.title}" 내용을 보고 문의드립니다.`
    : `${category.title} 관련 상담을 문의드립니다.`;

  return {
    needType,
    message,
  };
}
