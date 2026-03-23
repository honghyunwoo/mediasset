function paragraph(text) {
  return { type: "paragraph", text };
}

function heading(text) {
  return { type: "heading", text };
}

function list(items) {
  return { type: "list", items };
}

function post({ slug, title, summary, date, tag, content, authorName = "홍준혁" }) {
  return {
    slug,
    title,
    summary,
    date,
    tag,
    authorName,
    content,
  };
}

export const boardCategories = [
  {
    slug: "notice",
    title: "상담 · 운영 안내",
    shortTitle: "안내",
    eyebrow: "Consulting Notice",
    description:
      "상담 일정과 진행 안내를 모았습니다.",
    hero:
      "상담 전 먼저 확인하면 좋은 기본 안내입니다.",
    posts: [
      post({
        slug: "april-insurance-consulting-schedule",
        title: "4월 보험 상담 일정 안내",
        summary:
          "의사 개인 생명보험, 법인보험, 상속·증여 이슈를 함께 보고 싶은 고객을 위한 1:1 상담 일정을 안내합니다.",
        date: "2026-03-21",
        tag: "상담 일정",
        content: [
          heading("이번 일정의 목적"),
          paragraph(
            "4월 상담은 단순 상품 설명보다 현재 보험 구조와 준비 방향을 정리하는 1차 점검 중심으로 진행합니다. 의사 개인 보장, 법인보험, 가족 보호, 상속과 증여 이슈까지 함께 묻는 분들이 많아 이를 한 흐름으로 확인할 수 있도록 시간을 배정합니다.",
          ),
          heading("이런 경우에 상담이 적합합니다"),
          list([
            "기존 보험이 많은데 지금 구조가 맞는지 다시 보고 싶은 경우",
            "법인 대표 또는 병원장으로서 법인보험을 함께 검토하고 싶은 경우",
            "가족 보호와 상속 · 증여 대비를 같이 묻고 싶은 경우",
          ]),
          paragraph(
            "문의폼에 현재 상황과 궁금한 내용을 남겨주시면 접수 후 24시간 이내 연락드리고, 가능한 일정과 준비 사항을 먼저 안내드립니다.",
          ),
        ],
      }),
      post({
        slug: "first-consulting-checklist",
        title: "첫 상담 전 보험 점검 체크리스트 제공",
        summary:
          "기존 보험과 현재 고민을 빠르게 정리할 수 있도록 첫 상담 전 체크리스트를 제공합니다.",
        date: "2026-03-15",
        tag: "상담 안내",
        content: [
          heading("처음부터 많은 서류가 필요한 것은 아닙니다"),
          paragraph(
            "첫 상담은 현재 가입 중인 보험, 최근에 가장 고민되는 이슈, 병원 또는 법인의 현재 상황 정도만 정리돼 있어도 충분히 시작할 수 있습니다. 중요한 것은 자료의 양보다 현재 무엇이 급한지 먼저 구분하는 것입니다.",
          ),
          heading("미리 정리하면 좋은 항목"),
          list([
            "현재 가입 중인 주요 보험의 종류와 대략적인 목적",
            "의사 개인 문의인지, 병원장 또는 법인 대표 문의인지",
            "상속 · 증여 · 세금 이슈를 함께 보고 싶은지 여부",
          ]),
          paragraph(
            "문의 접수 후 안내되는 체크리스트를 기준으로 간단히 준비해 주시면 상담 시간을 더 효율적으로 사용할 수 있습니다.",
          ),
        ],
      }),
      post({
        slug: "lotte-world-tower-consulting-guide",
        title: "롯데월드타워 대면 상담 안내",
        summary:
          "필요 시 서울 송파구 롯데월드타워에서 대면 상담을 진행하며, 문의 접수 후 개별 안내드립니다.",
        date: "2026-03-08",
        tag: "대면 상담",
        content: [
          heading("대면 상담이 필요한 경우"),
          paragraph(
            "법인보험 구조, 가족 보호, 상속과 증여 이슈처럼 설명해야 할 범위가 넓은 경우에는 전화보다 대면 상담이 더 빠를 수 있습니다. 대면 상담은 문의 내용을 먼저 확인한 뒤 필요한 경우에만 연결합니다.",
          ),
          heading("대면 상담 전 확인하는 내용"),
          list([
            "현재 문의가 개인 보장인지 법인보험인지",
            "기존 보험을 점검하는 단계인지 신규 구조를 보는 단계인지",
            "상속 · 증여 또는 세금 이슈를 함께 다루는지",
          ]),
          paragraph(
            "문의가 접수되면 24시간 이내 연락드리고, 대면 상담이 더 적합한 경우 장소와 준비 사항을 개별 안내드립니다.",
          ),
        ],
      }),
    ],
  },
  {
    slug: "doctor-life",
    title: "의사 생명보험 브리핑",
    shortTitle: "의사 보험",
    eyebrow: "Doctor Life Insurance",
    description:
      "의사 개인 보장과 기존 보험 점검을 다룹니다.",
    hero:
      "의사 개인 보험 관련 핵심 주제를 정리했습니다.",
    posts: [
      post({
        slug: "doctor-life-insurance-review-start",
        title: "의사 개인 생명보험은 무엇부터 점검해야 하는가",
        summary:
          "가입 금액보다 먼저 현재 보장 공백과 가족 보호 구조가 맞는지부터 확인해야 하는 이유를 설명합니다.",
        date: "2026-03-20",
        tag: "개인 보장",
        content: [
          heading("보험 개수보다 구조가 먼저입니다"),
          paragraph(
            "의사 고객은 이미 여러 보험을 보유한 경우가 많지만, 실제로 중요한 것은 현재 소득 구조와 가족 보호 목적에 맞게 정리돼 있는지입니다. 가입 금액만 크다고 안정적인 구조가 되는 것은 아닙니다.",
          ),
          heading("점검의 기준"),
          list([
            "현재 소득이 멈췄을 때 가족 보호가 실제로 가능한지",
            "기존 계약이 목적 없이 중복되어 있지 않은지",
            "향후 법인보험이나 승계 이슈와 연결될 여지가 있는지",
          ]),
          paragraph(
            "첫 상담에서는 모든 상품을 다시 설명하기보다, 지금 구조에서 무엇을 유지하고 무엇을 다시 봐야 하는지 우선순위를 먼저 정리합니다.",
          ),
        ],
      }),
      post({
        slug: "why-existing-insurance-needs-review",
        title: "기존 보험이 많은데 다시 점검해야 하는 이유",
        summary:
          "보험 개수보다 중요한 것은 지금 상황에 맞는 보장 구조인지 확인하는 것입니다.",
        date: "2026-03-14",
        tag: "리모델링",
        content: [
          heading("과거의 판단이 지금도 맞는지는 별개의 문제입니다"),
          paragraph(
            "의사 고객은 개원 전후, 수입 구조 변화, 가족 상황 변화에 따라 보험 목적이 달라집니다. 예전에 적절했던 계약도 지금은 우선순위가 달라졌을 수 있습니다.",
          ),
          heading("리모델링이 필요한 신호"),
          list([
            "가입 사유를 기억하지 못하는 계약이 많은 경우",
            "같은 목적의 보장이 여러 개로 나뉘어 있는 경우",
            "법인보험이나 가족 보호 목적과 연결되지 않은 경우",
          ]),
          paragraph(
            "리모델링의 핵심은 해지나 변경 자체가 아니라, 현재 상황에 맞는 구조로 다시 정리하는 것입니다.",
          ),
        ],
      }),
      post({
        slug: "vip-family-protection-design-points",
        title: "의사 VIP 고객의 가족 보호 설계 포인트",
        summary:
          "소득 규모가 아니라 가족과 자산 구조에 따라 생명보험 설계가 달라져야 하는 포인트를 정리합니다.",
        date: "2026-03-09",
        tag: "가족 보호",
        content: [
          heading("가족 보호는 소득보다 구조의 문제입니다"),
          paragraph(
            "가족 보호 설계는 단순히 큰 보장을 두는 것이 아니라, 실제 자금이 필요한 시점과 목적에 맞게 준비하는 것이 중요합니다. 의사 VIP 고객은 병원 수익과 개인 자산이 연결된 경우가 많아 보호 구조도 그 흐름을 함께 봐야 합니다.",
          ),
          heading("실무에서 자주 보는 포인트"),
          list([
            "배우자와 자녀에게 필요한 현금 흐름이 언제 발생하는지",
            "병원 운영 자금과 가족 생활 자금을 분리해 볼 수 있는지",
            "상속 · 증여 대비와 생명보험 목적이 충돌하지 않는지",
          ]),
          paragraph(
            "상담에서는 현재 자산 규모보다, 가족 보호 목적이 실제로 작동하는 구조인지부터 차분히 점검합니다.",
          ),
        ],
      }),
    ],
  },
  {
    slug: "corporate-insurance",
    title: "법인보험 솔루션",
    shortTitle: "법인보험",
    eyebrow: "Corporate Insurance",
    description:
      "법인 대표와 임원 보장, 법인보험 구조를 다룹니다.",
    hero:
      "법인보험 관련 핵심 주제를 정리했습니다.",
    posts: [
      post({
        slug: "when-to-start-corporate-insurance-review",
        title: "법인보험은 언제부터 검토하는 것이 좋은가",
        summary:
          "병원장과 법인 대표는 운영 안정성과 보장 목적에 맞춰 법인보험을 검토해야 합니다.",
        date: "2026-03-18",
        tag: "법인보험",
        content: [
          heading("법인보험은 늦게 볼수록 복잡해집니다"),
          paragraph(
            "법인보험은 단순히 매출이 커졌을 때만 보는 것이 아닙니다. 대표와 핵심 인력의 역할이 커지고, 병원 또는 법인의 자금 흐름이 안정화되는 시점부터 검토하는 것이 보통 더 효율적입니다.",
          ),
          heading("검토 시작 신호"),
          list([
            "대표 개인 보장과 법인 리스크를 분리해 볼 필요가 생긴 경우",
            "임원 보장을 체계적으로 다시 보고 싶은 경우",
            "장기적인 운영 안정성을 함께 설계하고 싶은 경우",
          ]),
          paragraph(
            "첫 상담에서는 법인보험이 필요한지부터 보며, 필요한 경우 기존 구조와 새 구조를 비교하는 순서로 안내합니다.",
          ),
        ],
      }),
      post({
        slug: "difference-between-owner-and-executive-coverage",
        title: "대표 보장과 임원 보장은 어떻게 다르게 봐야 하는가",
        summary:
          "법인 대표와 핵심 임원의 역할에 따라 보장 설계 포인트가 달라지는 이유를 설명합니다.",
        date: "2026-03-12",
        tag: "대표 보장",
        content: [
          heading("같은 보장으로 묶으면 비효율이 생깁니다"),
          paragraph(
            "대표 보장과 임원 보장은 역할과 책임, 대체 가능성, 운영 리스크가 다르기 때문에 같은 기준으로 설계하기 어렵습니다. 대표 중심의 리스크와 핵심 임원 중심의 리스크를 구분해 보는 것이 중요합니다.",
          ),
          heading("구분해서 봐야 할 이유"),
          list([
            "대표 부재 시 경영과 자금 흐름에 미치는 영향이 다름",
            "핵심 임원의 보장 목적이 유지와 보호인지, 보상 성격인지 다름",
            "법인보험의 운용 목적과 연결되는 포인트가 다름",
          ]),
          paragraph(
            "실제 상담에서는 직책별로 필요한 보호 목적을 먼저 분리하고, 그 다음 보험 구조를 연결합니다.",
          ),
        ],
      }),
      post({
        slug: "questions-before-corporate-insurance-consulting",
        title: "법인보험 상담 전 확인해야 할 질문들",
        summary:
          "현재 보장 상황, 기존 계약, 법인 구조를 어떤 순서로 점검하면 좋은지 정리합니다.",
        date: "2026-03-06",
        tag: "상담 준비",
        content: [
          heading("상담 전 질문이 정리되면 방향이 빨라집니다"),
          paragraph(
            "법인보험 상담은 상품 설명으로 시작하기보다, 현재 보장 상황과 운영 구조에서 무엇이 가장 중요한지부터 확인하는 편이 효율적입니다. 질문의 순서를 잘 잡으면 상담 시간이 줄어듭니다.",
          ),
          heading("먼저 확인하면 좋은 질문"),
          list([
            "현재 법인보험을 왜 검토하려는지 목적이 분명한가",
            "기존 계약이 있다면 유지 이유와 불편한 점이 무엇인가",
            "대표와 임원 중 누구의 보호가 우선인지",
          ]),
          paragraph(
            "문의 단계에서 이 정도만 남겨주셔도 상담 방향을 훨씬 빠르게 잡을 수 있습니다.",
          ),
        ],
      }),
    ],
  },
  {
    slug: "estate-tax",
    title: "상속 · 증여 · 세금 연계",
    shortTitle: "상속/세금",
    eyebrow: "Estate & Tax",
    description:
      "상속, 증여, 세금 이슈와 보험 연결을 다룹니다.",
    hero:
      "상속, 증여, 세금 관련 핵심 흐름을 정리했습니다.",
    posts: [
      post({
        slug: "where-insurance-connects-to-estate-planning",
        title: "상속과 증여 대비에서 보험이 연결되는 지점",
        summary:
          "VIP 고객 상담에서 상속과 증여 이슈를 보험과 함께 설명해야 하는 이유를 정리합니다.",
        date: "2026-03-20",
        tag: "상속·증여",
        content: [
          heading("보험은 별도 주제가 아니라 연결 지점입니다"),
          paragraph(
            "상속과 증여 대비를 묻는 고객은 단순히 세금만 보는 것이 아니라, 실제 자금 이전과 가족 보호가 어떻게 연결되는지를 함께 고민합니다. 그래서 보험은 독립된 상품이 아니라 구조를 설명하는 한 축으로 다뤄집니다.",
          ),
          heading("상담에서 함께 보는 질문"),
          list([
            "이전하려는 자산과 보호하려는 대상이 분명한지",
            "자금이 필요한 시점과 이전 방식이 정리돼 있는지",
            "보험 구조가 세금 이슈와 충돌하지 않는지",
          ]),
          paragraph(
            "실무에서는 세금 이야기만으로 끝내지 않고, 실제 자금 흐름과 보호 목적을 함께 정리해야 설명이 쉬워집니다.",
          ),
        ],
      }),
      post({
        slug: "why-property-tax-and-coverage-are-linked",
        title: "부동산세금과 보장 설계를 같이 보는 이유",
        summary:
          "부동산 관련 세금 이슈가 있을 때 보험 상담과 별개로 볼 수 없는 경우를 설명합니다.",
        date: "2026-03-12",
        tag: "부동산세금",
        content: [
          heading("현금화 시점이 다르면 설명도 달라집니다"),
          paragraph(
            "부동산세금 이슈는 단순히 세율만의 문제가 아니라, 실제 현금이 필요한 시점과 자금 준비 방식까지 함께 봐야 하는 경우가 많습니다. 그래서 보험 상담과 따로 떼기 어려운 장면이 생깁니다.",
          ),
          heading("함께 보는 이유"),
          list([
            "보유 자산은 크지만 현금 흐름이 제한적인 경우",
            "가족 보호와 자산 이전을 동시에 준비해야 하는 경우",
            "부동산 관련 세금 이슈가 다른 자금 계획과 연결되는 경우",
          ]),
          paragraph(
            "상담에서는 부동산세금 그 자체보다, 그 이슈가 전체 보호 구조에 어떤 영향을 주는지부터 설명합니다.",
          ),
        ],
      }),
      post({
        slug: "vip-consulting-flow-for-corporate-tax-questions",
        title: "법인세 이슈를 함께 묻는 VIP 고객 상담 흐름",
        summary:
          "법인세와 보장 이슈를 함께 질문하는 고객 상담에서 어떤 순서로 설명하는지 정리합니다.",
        date: "2026-03-05",
        tag: "법인세",
        content: [
          heading("질문은 함께 오지만 답은 순서가 필요합니다"),
          paragraph(
            "VIP 고객은 법인세, 보장, 상속과 증여 이슈를 한 번에 묻는 경우가 많습니다. 이때는 질문 순서를 잘 정리하지 않으면 설명이 복잡해지기 때문에, 무엇이 당장 필요한지부터 먼저 분리해야 합니다.",
          ),
          heading("실제 상담 순서"),
          list([
            "현재 법인 구조와 보장 목적을 먼저 정리한다",
            "세금 이슈가 왜 같이 나오는지 배경을 확인한다",
            "보험과 세금 설명을 한 흐름으로 재정리한다",
          ]),
          paragraph(
            "핵심은 세금 지식 자체보다, 고객이 지금 어떤 판단을 내려야 하는지 분명하게 보여주는 것입니다.",
          ),
        ],
      }),
    ],
  },
  {
    slug: "seminar-guide",
    title: "세미나 · 상담 가이드",
    shortTitle: "세미나/가이드",
    eyebrow: "Seminar & Guide",
    description:
      "세미나 이후와 첫 상담 전에 보면 좋은 내용을 모았습니다.",
    hero:
      "세미나와 상담 준비 흐름을 간단히 정리했습니다.",
    posts: [
      post({
        slug: "what-to-prepare-for-first-insurance-consulting",
        title: "첫 보험 상담에서는 무엇을 준비하면 좋은가",
        summary:
          "현재 가입 중인 보험과 가장 궁금한 부분 정도만 정리해 오셔도 첫 상담은 충분히 시작할 수 있습니다.",
        date: "2026-03-17",
        tag: "상담 준비",
        content: [
          heading("처음부터 완벽할 필요는 없습니다"),
          paragraph(
            "첫 상담은 지금 상황과 고민을 정리하는 자리이기 때문에, 서류를 많이 준비하지 않아도 시작할 수 있습니다. 현재 보험 현황과 가장 궁금한 이슈만 정리돼 있어도 방향을 잡는 데 충분합니다.",
          ),
          heading("준비하면 좋은 최소 항목"),
          list([
            "현재 가입 중인 보험의 대략적인 구성",
            "개인 문의인지 법인 문의인지에 대한 구분",
            "가장 먼저 정리하고 싶은 질문 한두 가지",
          ]),
          paragraph(
            "문의폼에 간단히 남겨주시면 접수 후 24시간 이내 연락드리고, 필요한 경우 추가 준비 사항을 개별 안내드립니다.",
          ),
        ],
      }),
      post({
        slug: "after-seminar-consulting-flow",
        title: "세미나 이후 바로 상담으로 연결되는 경우",
        summary:
          "세미나나 커뮤니티 강의 이후 어떤 흐름으로 후속 상담을 진행하는지 간단히 설명합니다.",
        date: "2026-03-09",
        tag: "세미나",
        content: [
          heading("세미나 이후 상담은 속도가 중요합니다"),
          paragraph(
            "세미나 직후에는 관심이 높지만, 질문은 아직 정리되지 않은 경우가 많습니다. 그래서 후속 상담은 상품 설명보다 지금 무엇이 가장 궁금한지부터 빠르게 좁히는 방식으로 진행하는 것이 좋습니다.",
          ),
          heading("일반적인 후속 흐름"),
          list([
            "세미나 이후 문의 접수",
            "24시간 이내 연락 및 질문 정리",
            "전화 또는 대면 상담으로 세부 내용 연결",
          ]),
          paragraph(
            "이 흐름은 의사 커뮤니티나 소개를 통한 유입에도 같은 방식으로 적용할 수 있습니다.",
          ),
        ],
      }),
      post({
        slug: "how-referral-vip-inquiries-are-handled",
        title: "소개로 문의하는 VIP 고객은 어떻게 상담하나요?",
        summary:
          "소개로 문의한 VIP 고객은 민감한 이슈가 많기 때문에 필요한 범위를 중심으로 빠르게 상담을 연결합니다.",
        date: "2026-03-02",
        tag: "VIP 상담",
        content: [
          heading("소개 문의는 신뢰와 속도가 핵심입니다"),
          paragraph(
            "소개로 유입된 VIP 고객은 이미 일정 수준의 신뢰를 갖고 들어오지만, 동시에 민감한 질문을 빠르게 확인받고 싶어하는 경우가 많습니다. 그래서 필요한 범위를 먼저 확인하고, 설명은 짧고 분명하게 가져가는 편이 좋습니다.",
          ),
          heading("상담에서 우선 확인하는 부분"),
          list([
            "개인 보장인지 법인보험인지 핵심 주제 확인",
            "상속 · 증여 또는 세금 이슈 동반 여부 확인",
            "전화가 적합한지 대면이 적합한지 판단",
          ]),
          paragraph(
            "소개 문의는 길게 끌기보다, 현재 상황에 맞는 다음 단계를 빠르게 제안하는 것이 더 중요합니다.",
          ),
        ],
      }),
    ],
  },
];

export function getBoardCategory(slug) {
  return boardCategories.find((category) => category.slug === slug);
}

export function getBoardPost(categorySlug, postSlug) {
  const category = getBoardCategory(categorySlug);

  if (!category) {
    return null;
  }

  const post = category.posts.find((item) => item.slug === postSlug);

  if (!post) {
    return null;
  }

  return {
    category,
    post,
  };
}

export function getBoardPostParams() {
  return boardCategories.flatMap((category) =>
    category.posts.map((entry) => ({
      slug: category.slug,
      postSlug: entry.slug,
    })),
  );
}

export function formatBoardDate(value) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

export function getRecentBoardPosts(limit = 6) {
  return boardCategories
    .flatMap((category) =>
      category.posts.map((entry) => ({
        ...entry,
        categorySlug: category.slug,
        categoryTitle: category.title,
      })),
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
}
