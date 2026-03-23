import Link from "next/link";

import { siteConfig } from "@/lib/site";

export default function QuickContactBar() {
  return (
    <div className="quick-contact-bar" aria-label="빠른 상담 연결">
      <a
        className="quick-contact-bar__button quick-contact-bar__button--call"
        href={`tel:${siteConfig.phone.replace(/-/g, "")}`}
      >
        전화 상담
      </a>
      <Link className="quick-contact-bar__button quick-contact-bar__button--inquiry" href="/#contact">
        문의 남기기
      </Link>
    </div>
  );
}
