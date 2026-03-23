export default function manifest() {
  return {
    name: "MEDI ASSET PARTNER",
    short_name: "MEDI ASSET",
    description: "의사와 병원장을 위한 프라이빗 자산관리 파트너",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f0ea",
    theme_color: "#13345b",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
