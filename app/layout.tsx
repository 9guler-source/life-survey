import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SYS 인생 항해 점검표 — 나의 인생 나침반",
  description: "지나온 길과 앞으로의 여정을 돌아보는 40가지 질문의 여행",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
