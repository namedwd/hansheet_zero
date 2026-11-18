import { PAYMENT_GUIDANCE, publicMoney } from "../publicPricing";
import { inquiryUrl } from "../site";

// 요금 화면 공용 조각. 금액과 결제 안내 문구는 app/publicPricing.js 한 곳에서만 나옵니다.
// (제로패킹 사이트의 lib/publicPricing.js 와 똑같은 파일입니다. 한쪽만 고치지 마세요.)

// 요금표에 보여 주는 포장대 수.
const STATION_COUNTS = [1, 2, 3, 5, 10];

export function StationPriceTable({
  currency,
  head,
  stations,
}: {
  currency: string;
  // 표 머리글: [포장대 수, 월 결제, 연간 결제]
  head: [string, string, string];
  // 포장대 수를 그 언어로 적는 방법. 예: (n) => `梱包台 ${n}台`
  stations: (count: number) => string;
}) {
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
      <table className="w-full text-sm">
        <thead className="bg-zinc-50 text-left dark:bg-zinc-900">
          <tr>
            <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">{head[0]}</th>
            <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">{head[1]}</th>
            <th className="px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-400">{head[2]}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {STATION_COUNTS.map((count) => (
            <tr key={count}>
              <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{stations(count)}</td>
              <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">{publicMoney(currency, "monthly", count)}</td>
              <td className="px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-400">{publicMoney(currency, "yearly", count)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 해외 고객용 결제 안내(자동 결제 없음 · 결제 전 문의 · 세금과 청구 통화 안내).
export function PaymentNote({ language }: { language: "en" | "ja" | "zh-tw" | "vi" }) {
  const t = PAYMENT_GUIDANCE[language];
  return (
    <aside className="mx-auto mt-6 max-w-md rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-left text-sm leading-6 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
      <h3 className="font-semibold text-black dark:text-white">{t.title}</h3>
      <p className="mt-2">{t.body}</p>
      <p className="mt-2 text-zinc-500">{t.tax}</p>
      {/* 제로패킹 사이트와 같이 문의 칸으로 보냅니다(메일 프로그램이 없어도 문의가 남습니다). */}
      <a
        href={inquiryUrl(language, "payment")}
        target="_blank"
        rel="noopener"
        className="mt-3 inline-block font-medium text-black underline dark:text-white"
      >
        {t.contact}
      </a>
    </aside>
  );
}
