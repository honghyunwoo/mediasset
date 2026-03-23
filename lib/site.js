export const siteConfig = {
  name: "MAP컨설팅",
  shortName: "MAP컨설팅",
  url: "https://mediasset.kr",
  domain: "mediasset.kr",
  title: "MAP컨설팅 | 의사·법인 VIP 보험 상담",
  description:
    "MAP컨설팅은 신한라이프와 함께 의사 및 법인 VIP 고객을 위한 보험 상담을 제공합니다. 문의를 남기시면 24시간 이내 연락드립니다.",
  keywords: [
    "MAP컨설팅",
    "mediasset.kr",
    "홍준혁",
    "신한라이프",
    "의사 보험",
    "의사 생명보험",
    "법인보험",
    "VIP 보험",
    "상속 증여 보험",
  ],
  consultantName: "홍준혁",
  affiliation: "신한라이프",
  phone: "010-3141-9386",
  email: "4993357@naver.com",
  address: "서울특별시 송파구 올림픽로 300, 롯데월드타워 8층",
};

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, siteConfig.url).toString();
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "서울특별시 송파구 올림픽로 300, 롯데월드타워 8층",
    addressLocality: "서울",
    addressCountry: "KR",
  },
  areaServed: "KR",
  availableLanguage: ["ko"],
  serviceType: [
    "생명보험 상담",
    "법인보험 상담",
    "의사 VIP 보험 상담",
    "상속 및 증여 대비 상담",
    "법인 고객 보장 상담",
  ],
};
