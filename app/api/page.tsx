import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../site";
import { ImagePlaceholder } from "../components/Illustrations";
import { JsonLd, buildBreadcrumb, buildArticle } from "../components/JsonLd";
import { ConversionCTA } from "../components/ConversionCTA";

const PATH = "/api";

export const metadata: Metadata = {
  title: "포장영상 API · WMS 연동 - 카페24, 고도몰, 자체 시스템 호환",
  description:
    "포장영상을 기존 WMS·OMS·이커머스 시스템과 연동하는 방법. 표준 REST API와 바코드 인터페이스로 카페24·고도몰·메이크샵·자체 개발 시스템 모두 지원합니다.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "포장영상 API · WMS 연동 가이드",
    description:
      "표준 REST API로 포장영상을 기존 WMS·OMS·이커머스에 통합. 운송장 자동 매칭과 영상 링크 자동 발송.",
    url: PATH,
  },
};

const ENDPOINTS = [
  {
    method: "POST",
    path: "/v1/recordings",
    desc: "운송장 번호와 함께 포장영상 녹화 시작 요청. 바코드 스캐너 대신 시스템에서 직접 트리거할 때 사용.",
  },
  {
    method: "GET",
    path: "/v1/recordings/{trackingNo}",
    desc: "운송장 번호로 포장영상 메타데이터(URL, 길이, 촬영 일시) 조회.",
  },
  {
    method: "GET",
    path: "/v1/recordings/{trackingNo}/share-link",
    desc: "고객 공유용 포장영상 링크 생성 (만료 기간 설정 가능).",
  },
  {
    method: "POST",
    path: "/v1/webhooks",
    desc: "포장영상 녹화 완료·업로드 완료 이벤트를 사용자 시스템으로 푸시.",
  },
];

const INTEGRATIONS = [
  { name: "카페24", desc: "주문 발송 시 운송장 자동 매칭, 영상 링크 자동 메모 등록" },
  { name: "고도몰 5", desc: "주문관리 → 발송완료 시점 트리거로 영상 색인" },
  { name: "메이크샵", desc: "MS 표준 API로 운송장 등록 시 동기화" },
  { name: "스마트스토어", desc: "엑셀 일괄 발송 후 운송장 매핑 자동화" },
  { name: "자체 WMS", desc: "REST API + Webhook으로 어떤 시스템과도 연동" },
  { name: "ERP (더존, SAP 등)", desc: "발송 완료 트리거를 ERP에 연결, 회계 마감과 연동" },
];

const FAQ = [
  {
    q: "API 호출에 별도 비용이 있나요?",
    a: "API·Webhook 사용은 단일 요금제(월 30,000원/포장대)에 포함되어 있어 일반적인 쇼핑몰 규모에서는 추가 비용이 발생하지 않습니다. 호출량이 매우 큰 엔터프라이즈 규모는 별도 문의 주시면 안내해 드립니다.",
  },
  {
    q: "API 연동에 개발 인력이 얼마나 필요한가요?",
    a: "REST API 표준이라 백엔드 개발자 1명이 0.5~1일이면 기본 연동을 마칠 수 있습니다. 카페24·고도몰 등 주요 솔루션은 가이드 문서가 별도 제공됩니다.",
  },
  {
    q: "Webhook을 통해 어떤 이벤트를 받을 수 있나요?",
    a: "녹화 시작, 녹화 완료, 클라우드 업로드 완료, 영상 조회 발생 등 주요 라이프사이클 이벤트를 Webhook으로 푸시받을 수 있습니다.",
  },
];

export default function ApiPage() {
  const today = new Date().toISOString();
  return (
    <>
      <JsonLd
        data={buildBreadcrumb(SITE_URL, [
          { name: "홈", path: "/" },
          { name: "API · WMS 연동", path: PATH },
        ])}
      />
      <JsonLd
        data={buildArticle({
          siteUrl: SITE_URL,
          path: PATH,
          headline: "포장영상 API · WMS 연동",
          description:
            "표준 REST API로 포장영상을 카페24·고도몰·자체 WMS에 통합하는 가이드.",
          datePublished: today,
          dateModified: today,
        })}
      />

      <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
        <nav aria-label="현재 위치" className="mb-6 text-sm text-zinc-500">
          <Link href="/" className="hover:text-black dark:hover:text-white">홈</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700 dark:text-zinc-300">API · WMS 연동</span>
        </nav>

        <header className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
            개발자 · 시스템 연동
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            포장영상 API
            <br />
            <span className="text-zinc-500">기존 시스템에 그대로 붙입니다</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            제로패킹은 표준 REST API와 바코드 인터페이스를 제공하여, 카페24·
            고도몰·메이크샵·스마트스토어부터 자체 개발 WMS까지 어떤 시스템과도
            연동됩니다. 운송장 자동 매칭, 영상 링크 자동 발송, Webhook 이벤트
            구독까지 모두 가능합니다.
          </p>
        </header>

        <section className="mb-14">
          <figure>
            <ImagePlaceholder
              label="API 연동 다이어그램 (WMS ↔ 포장영상 ↔ 클라우드)"
              ratio="16/9"
            />
            <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              시스템 연동 다이어그램 (실사 예시 추가 예정)
            </figcaption>
          </figure>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            핵심 엔드포인트
          </h2>
          <ul className="mt-6 space-y-3">
            {ENDPOINTS.map((e) => (
              <li
                key={e.path}
                className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded px-2 py-0.5 font-mono text-xs font-bold ${
                      e.method === "GET"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                        : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                    }`}
                  >
                    {e.method}
                  </span>
                  <code className="font-mono text-sm text-black dark:text-white">{e.path}</code>
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{e.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            예시 — 운송장으로 영상 조회
          </h2>
          <pre className="mt-6 overflow-x-auto rounded-2xl bg-zinc-900 p-5 text-sm text-zinc-100">
            <code>{`curl -H "Authorization: Bearer YOUR_TOKEN" \\
  https://api.zeropacking.com/v1/recordings/1234567890

{
  "trackingNo": "1234567890",
  "recordedAt": "2026-05-10T14:23:11+09:00",
  "duration": 47,
  "url": "https://cdn.zeropacking.com/v/abc123",
  "shareLink": "https://zeropacking.com/v/abc123",
  "thumbnail": "https://cdn.zeropacking.com/t/abc123.jpg"
}`}</code>
          </pre>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            지원하는 시스템
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {INTEGRATIONS.map((i) => (
              <li key={i.name} className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
                <h3 className="text-base font-semibold text-black dark:text-zinc-50">{i.name}</h3>
                <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{i.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
            자주 묻는 질문
          </h2>
          <div className="mt-6 divide-y divide-zinc-200 dark:divide-zinc-800">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-black dark:text-zinc-50">
                  {f.q}
                  <span className="text-zinc-400 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <ConversionCTA title="기존 시스템 연동, 1:1로 안내드립니다" description="카페24·고도몰·자체 WMS 등 어떤 시스템과도 연동됩니다. 도입 문의를 남기면 우리 시스템에 맞는 연동 방안을 안내받을 수 있습니다." />

        <nav aria-label="관련 글" className="mt-14 grid gap-3 sm:grid-cols-2">
          <Link href="/guide" className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">관련 글</span>
            <p className="mt-1 font-semibold text-black dark:text-white">포장영상 도입 가이드</p>
          </Link>
          <Link href="/pricing" className="rounded-2xl border border-zinc-200 p-5 hover:border-black dark:border-zinc-800 dark:hover:border-white">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">관련 글</span>
            <p className="mt-1 font-semibold text-black dark:text-white">포장영상 요금</p>
          </Link>
        </nav>
      </main>
    </>
  );
}
