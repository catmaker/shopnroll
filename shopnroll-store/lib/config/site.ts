import type { Metadata } from "next";

const name = "ShopNRoll Store";
const description =
  "Shop your favorite items with ShopNRoll - Your one-stop fashion destination";
const url = "https://shopnroll.com";

export const metadata: Metadata = {
  title: {
    default: name,
    template: `%s | ${name}`,
  },
  description,
  keywords: ["패션", "온라인 쇼핑", "의류", "악세서리", "ShopNRoll"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url,
    title: name,
    description,
    siteName: name,
  },
  twitter: {
    card: "summary_large_image",
    title: name,
    description,
  },
};
