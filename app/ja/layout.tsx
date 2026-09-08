import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "梱包動画の導入ガイド | Hansheet",
    template: "%s | Hansheet 梱包動画",
  },
};

export default function JapaneseLayout({ children }: { children: React.ReactNode }) {
  return <div lang="ja">{children}</div>;
}
