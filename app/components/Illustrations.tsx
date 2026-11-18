// SEO 친화적 SVG 일러스트레이션
// - 모든 SVG는 role="img" + <title>/<desc>로 접근성 + 검색엔진에 의미 전달
// - 벡터라 화질 손실 없음, 파일 크기 작음
// - 그림 안 글자와 설명은 페이지 언어를 따릅니다(locale). 외국어 페이지에 한글이 남지 않게 합니다.

import type { Locale } from "../i18n";

// 4단계 그림의 설명(화면에는 안 보이고 화면 낭독기·검색엔진이 읽음).
const STEP_LABELS: Record<Locale, [string, string, string, string]> = {
  ko: ["바코드 스캔으로 포장영상 시작", "포장 과정 HD 녹화", "운송장 번호로 클라우드 색인", "영상 링크 공유로 클레임 종결"],
  en: ["Scan the barcode to start the packing video", "Packing recorded in HD", "Indexed in the cloud by tracking number", "Share the video link to close the claim"],
  ja: ["バーコードをスキャンして梱包動画を開始", "梱包工程をHD画質で録画", "送り状番号でクラウドに記録", "動画リンクの共有でクレームを解決"],
  "zh-tw": ["掃描條碼開始錄製包裝影片", "以 HD 畫質錄下包裝過程", "依物流單號在雲端建立索引", "分享影片連結，結束客訴"],
  vi: ["Quét mã vạch để bắt đầu video đóng gói", "Ghi lại quá trình đóng gói ở chất lượng HD", "Lưu trên đám mây theo mã vận đơn", "Chia sẻ liên kết video để khép lại khiếu nại"],
};

// 검색 시간 비교 그림의 글자.
const COMPARISON_TEXT: Record<Locale, {
  title: string; desc: string; heading: string; ours: string; oursValue: string;
  cctv: string; cctvValue: string; notes: [string, string];
}> = {
  ko: {
    title: "포장영상과 일반 CCTV의 검색 시간 비교",
    desc: "포장영상은 운송장 번호로 평균 3초 만에 영상을 찾고, 일반 CCTV는 시간대 검색으로 평균 30분 이상 소요됨을 보여주는 막대 차트.",
    heading: "해당 영상 찾는 데 걸리는 시간",
    ours: "제로패킹 포장영상",
    oursValue: "평균 3초",
    cctv: "일반 매장 CCTV",
    cctvValue: "평균 30분 이상 (시간대 추정 + 영상 스크러빙)",
    notes: [
      "포장영상은 운송장 번호 1:1 색인 → 클릭 한 번에 해당 주문 영상 재생",
      "CCTV는 출고 시각을 추정하고, 해당 시간대 녹화본을 직접 돌려봐야 함",
    ],
  },
  en: {
    title: "Search time: packing video vs. ordinary CCTV",
    desc: "Bar chart: a packing video is found in about 3 seconds by tracking number, while ordinary CCTV takes over 30 minutes on average searching by time of day.",
    heading: "Time to find the right footage",
    ours: "Zeropacking packing video",
    oursValue: "About 3 seconds",
    cctv: "Ordinary store CCTV",
    cctvValue: "Over 30 minutes on average (guess the time + scrub the footage)",
    notes: [
      "Packing video is indexed 1:1 by tracking number → one click plays the video of that order",
      "With CCTV you estimate the shipping time and replay that period yourself",
    ],
  },
  ja: {
    title: "梱包動画と一般的なCCTVの検索時間の比較",
    desc: "梱包動画は送り状番号で平均3秒で動画を見つけられ、一般的なCCTVは時間帯で探すため平均30分以上かかることを示す棒グラフ。",
    heading: "該当の映像を見つけるまでの時間",
    ours: "ゼロパッキングの梱包動画",
    oursValue: "平均3秒",
    cctv: "一般的な店舗用CCTV",
    cctvValue: "平均30分以上（時間帯の推定＋映像の早送り確認）",
    notes: [
      "梱包動画は送り状番号と1対1で紐づく → ワンクリックで該当注文の動画を再生",
      "CCTVは出荷時刻を推定し、その時間帯の録画を自分で見返す必要がある",
    ],
  },
  "zh-tw": {
    title: "包裝影片與一般 CCTV 的搜尋時間比較",
    desc: "長條圖：包裝影片以物流單號平均 3 秒找到影片，一般 CCTV 以時段搜尋平均需 30 分鐘以上。",
    heading: "找到該筆影片所需的時間",
    ours: "Zeropacking 包裝影片",
    oursValue: "平均 3 秒",
    cctv: "一般店面 CCTV",
    cctvValue: "平均 30 分鐘以上（推估時段＋逐段回放）",
    notes: [
      "包裝影片與物流單號一對一索引 → 點一下即可播放該訂單的影片",
      "CCTV 需先推估出貨時間，再自行回放該時段的錄影",
    ],
  },
  vi: {
    title: "So sánh thời gian tìm video: video đóng gói và CCTV thông thường",
    desc: "Biểu đồ cột: video đóng gói tìm thấy video trong trung bình 3 giây bằng mã vận đơn, còn CCTV thông thường phải tìm theo khung giờ và mất trung bình hơn 30 phút.",
    heading: "Thời gian để tìm đúng đoạn video",
    ours: "Video đóng gói Zeropacking",
    oursValue: "Trung bình 3 giây",
    cctv: "CCTV cửa hàng thông thường",
    cctvValue: "Trung bình hơn 30 phút (ước lượng khung giờ + tua video)",
    notes: [
      "Video đóng gói gắn 1:1 với mã vận đơn → một cú nhấp là phát video của đơn hàng",
      "CCTV phải ước lượng giờ xuất hàng rồi tự tua lại bản ghi của khung giờ đó",
    ],
  },
};

export function StepIllustration({
  step,
  locale,
  className = "",
}: {
  step: 1 | 2 | 3 | 4;
  locale: Locale;
  className?: string;
}) {
  const common = "w-full h-full";
  const label = STEP_LABELS[locale][step - 1];
  if (step === 1)
    return (
      <svg viewBox="0 0 120 120" className={`${className} ${common}`} role="img" aria-label={label}>
        <rect x="20" y="40" width="80" height="40" rx="4" fill="#fafafa" stroke="#e4e4e7" />
        {[24, 30, 38, 44, 52, 60, 66, 74, 82, 90, 96].map((x, i) => (
          <rect key={i} x={x} y="46" width={i % 2 === 0 ? 2 : 3} height="28" fill="#18181b" />
        ))}
        <line x1="20" y1="60" x2="100" y2="60" stroke="#ef4444" strokeWidth="2">
          <animate attributeName="y1" values="46;74;46" dur="2s" repeatCount="indefinite" />
          <animate attributeName="y2" values="46;74;46" dur="2s" repeatCount="indefinite" />
        </line>
      </svg>
    );
  if (step === 2)
    return (
      <svg viewBox="0 0 120 120" className={`${className} ${common}`} role="img" aria-label={label}>
        <rect x="30" y="30" width="60" height="50" rx="6" fill="#18181b" />
        <circle cx="60" cy="55" r="14" fill="#3f3f46" />
        <circle cx="60" cy="55" r="9" fill="#09090b" />
        <circle cx="56" cy="51" r="3" fill="#a1a1aa" />
        <circle cx="80" cy="40" r="3" fill="#ef4444">
          <animate attributeName="opacity" values="1;0.2;1" dur="1.4s" repeatCount="indefinite" />
        </circle>
        <text x="60" y="100" textAnchor="middle" fontSize="10" fill="#52525b" fontWeight="600">
          REC ● HD
        </text>
      </svg>
    );
  if (step === 3)
    return (
      <svg viewBox="0 0 120 120" className={`${className} ${common}`} role="img" aria-label={label}>
        <path
          d="M 35 60 Q 20 60 20 45 Q 20 30 35 30 Q 38 18 55 20 Q 75 18 82 32 Q 95 32 95 47 Q 95 62 80 62 L 35 62 Z"
          fill="#3b82f6"
        />
        <line x1="60" y1="68" x2="60" y2="88" stroke="#3b82f6" strokeWidth="2" strokeDasharray="2 2" />
        <polygon points="55,86 60,94 65,86" fill="#3b82f6" />
        <rect x="30" y="94" width="60" height="14" rx="3" fill="#fafafa" stroke="#e4e4e7" />
        <text x="60" y="104" textAnchor="middle" fontSize="8" fill="#27272a" fontFamily="monospace">
          1234-5678
        </text>
      </svg>
    );
  return (
    <svg viewBox="0 0 120 120" className={`${className} ${common}`} role="img" aria-label={label}>
      <rect x="25" y="35" width="50" height="60" rx="6" fill="#18181b" />
      <rect x="29" y="42" width="42" height="40" rx="2" fill="#fafafa" />
      <polygon points="44,55 44,73 60,64" fill="#18181b" />
      <g transform="translate(70, 30)">
        <circle cx="10" cy="10" r="6" fill="#22c55e" />
        <circle cx="30" cy="22" r="6" fill="#22c55e" />
        <circle cx="10" cy="34" r="6" fill="#22c55e" />
        <line x1="10" y1="10" x2="30" y2="22" stroke="#22c55e" strokeWidth="2" />
        <line x1="30" y1="22" x2="10" y2="34" stroke="#22c55e" strokeWidth="2" />
      </g>
    </svg>
  );
}

export function ComparisonChart({ locale, className = "" }: { locale: Locale; className?: string }) {
  const t = COMPARISON_TEXT[locale];
  return (
    <svg
      role="img"
      aria-labelledby="cmp-title cmp-desc"
      viewBox="0 0 600 320"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="cmp-title">{t.title}</title>
      <desc id="cmp-desc">{t.desc}</desc>

      <text x="20" y="30" fontSize="16" fontWeight="700" fill="#18181b">
        {t.heading}
      </text>

      {/* 포장영상 막대 */}
      <text x="20" y="80" fontSize="13" fontWeight="600" fill="#18181b">
        {t.ours}
      </text>
      <rect x="20" y="90" width="40" height="36" rx="4" fill="#22c55e" />
      <text x="70" y="114" fontSize="14" fontWeight="700" fill="#22c55e">
        {t.oursValue}
      </text>

      {/* CCTV 막대 */}
      <text x="20" y="170" fontSize="13" fontWeight="600" fill="#18181b">
        {t.cctv}
      </text>
      <rect x="20" y="180" width="540" height="36" rx="4" fill="#ef4444" opacity="0.85" />
      <text x="280" y="204" fontSize="14" fontWeight="700" fill="white" textAnchor="middle">
        {t.cctvValue}
      </text>

      <text x="20" y="270" fontSize="12" fill="#71717a">
        {t.notes[0]}
      </text>
      <text x="20" y="290" fontSize="12" fill="#71717a">
        {t.notes[1]}
      </text>
    </svg>
  );
}
