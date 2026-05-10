// SEO 친화적 SVG 일러스트레이션
// - 모든 SVG는 role="img" + <title>/<desc>로 접근성 + 검색엔진에 의미 전달
// - 벡터라 화질 손실 없음, 파일 크기 작음

export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-labelledby="hero-title hero-desc"
      viewBox="0 0 600 400"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <title id="hero-title">포장영상 자동 촬영 시스템</title>
      <desc id="hero-desc">
        포장대 위 카메라가 택배 박스를 촬영하고, 영상이 클라우드로 업로드되어
        운송장 번호로 검색되는 과정을 보여주는 일러스트.
      </desc>

      <defs>
        <linearGradient id="bg-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fafafa" />
          <stop offset="100%" stopColor="#f4f4f5" />
        </linearGradient>
        <linearGradient id="cam-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#18181b" />
          <stop offset="100%" stopColor="#27272a" />
        </linearGradient>
        <linearGradient id="box-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4a574" />
          <stop offset="100%" stopColor="#a67c52" />
        </linearGradient>
      </defs>

      <rect width="600" height="400" fill="url(#bg-grad)" rx="16" />

      {/* 포장대 */}
      <rect x="80" y="280" width="440" height="40" rx="4" fill="#71717a" />
      <rect x="80" y="280" width="440" height="8" rx="2" fill="#52525b" />

      {/* 박스 */}
      <g>
        <rect x="220" y="200" width="160" height="80" fill="url(#box-grad)" rx="2" />
        <rect x="220" y="200" width="160" height="6" fill="#8b6f47" />
        <line x1="300" y1="200" x2="300" y2="280" stroke="#8b6f47" strokeWidth="2" />
        {/* 운송장 라벨 */}
        <rect x="240" y="220" width="60" height="40" fill="white" rx="2" />
        <line x1="248" y1="232" x2="292" y2="232" stroke="#27272a" strokeWidth="1" />
        <line x1="248" y1="240" x2="278" y2="240" stroke="#27272a" strokeWidth="1" />
        <line x1="248" y1="248" x2="288" y2="248" stroke="#27272a" strokeWidth="1" />
        {/* 바코드 */}
        <g transform="translate(310, 222) scale(0.4)">
          {[0, 4, 10, 14, 22, 28, 34, 40, 48, 54, 62, 70, 78, 88, 100, 110].map((x, i) => (
            <rect key={i} x={x} y="0" width={i % 2 === 0 ? 2 : 3} height="40" fill="#27272a" />
          ))}
        </g>
      </g>

      {/* 카메라 (천장 거치) */}
      <g>
        <line x1="300" y1="20" x2="300" y2="80" stroke="#52525b" strokeWidth="3" />
        <rect x="270" y="80" width="60" height="50" fill="url(#cam-grad)" rx="6" />
        <circle cx="300" cy="105" r="14" fill="#09090b" />
        <circle cx="300" cy="105" r="9" fill="#3f3f46" />
        <circle cx="296" cy="101" r="3" fill="#71717a" />
        <circle cx="318" cy="90" r="2.5" fill="#ef4444">
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="1.4s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* 촬영 영역 점선 */}
      <g stroke="#a1a1aa" strokeWidth="1.5" strokeDasharray="4 4" fill="none">
        <line x1="285" y1="130" x2="200" y2="280" />
        <line x1="315" y1="130" x2="400" y2="280" />
      </g>

      {/* 클라우드 */}
      <g transform="translate(440, 70)">
        <path
          d="M 30 50 Q 0 50 0 30 Q 0 10 25 10 Q 30 -5 55 0 Q 80 -5 90 15 Q 110 15 110 35 Q 110 55 85 55 L 30 55 Z"
          fill="#3b82f6"
        />
        <text x="55" y="36" fontSize="14" fill="white" textAnchor="middle" fontWeight="600">
          Cloud
        </text>
      </g>

      {/* 카메라 → 클라우드 화살표 */}
      <g stroke="#3b82f6" strokeWidth="2" fill="none">
        <path d="M 330 100 Q 400 80 440 95" strokeDasharray="3 3">
          <animate
            attributeName="stroke-dashoffset"
            values="0;-12"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </path>
        <polygon points="438,90 448,95 438,100" fill="#3b82f6" />
      </g>

      {/* 검색 패널 */}
      <g transform="translate(60, 50)">
        <rect width="160" height="70" rx="8" fill="white" stroke="#e4e4e7" />
        <text x="12" y="22" fontSize="10" fill="#71717a" fontWeight="600">
          운송장 검색
        </text>
        <rect x="12" y="30" width="136" height="24" rx="4" fill="#fafafa" stroke="#e4e4e7" />
        <text x="20" y="46" fontSize="11" fill="#27272a" fontFamily="monospace">
          1234-5678-9012
        </text>
        <circle cx="138" cy="42" r="6" fill="#22c55e" />
      </g>

      {/* 검색 → 클라우드 화살표 */}
      <g stroke="#22c55e" strokeWidth="2" fill="none">
        <path d="M 220 90 Q 350 60 440 90" strokeDasharray="3 3" />
        <polygon points="220,85 210,90 220,95" fill="#22c55e" />
      </g>
    </svg>
  );
}

export function StepIllustration({
  step,
  className = "",
}: {
  step: 1 | 2 | 3 | 4;
  className?: string;
}) {
  const common = "w-full h-full";
  if (step === 1)
    return (
      <svg viewBox="0 0 120 120" className={`${className} ${common}`} role="img" aria-label="바코드 스캔으로 포장영상 시작">
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
      <svg viewBox="0 0 120 120" className={`${className} ${common}`} role="img" aria-label="포장 과정 HD 녹화">
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
      <svg viewBox="0 0 120 120" className={`${className} ${common}`} role="img" aria-label="운송장 번호로 클라우드 색인">
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
    <svg viewBox="0 0 120 120" className={`${className} ${common}`} role="img" aria-label="영상 링크 공유로 클레임 종결">
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

/**
 * 실사 사진이 도착하기 전까지 사용할 SVG placeholder.
 * 사용자가 실제 사진(PNG/JPG)을 public/ 에 추가한 뒤 next/image 로 교체하면 됩니다.
 */
export function ImagePlaceholder({
  label,
  className = "",
  ratio = "16/9",
}: {
  label: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed border-zinc-300 bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:border-zinc-700 dark:from-zinc-900 dark:via-black dark:to-zinc-950 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full opacity-40"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#d4d4d8" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>
      <div className="relative z-10 flex flex-col items-center gap-2 px-6 text-center">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-zinc-400">
          <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
          <circle cx="9" cy="9" r="2" strokeWidth="1.5" />
          <path d="M21 15l-5-5L5 21" strokeWidth="1.5" />
        </svg>
        <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{label}</p>
      </div>
    </div>
  );
}

export function ComparisonChart({ className = "" }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-labelledby="cmp-title cmp-desc"
      viewBox="0 0 600 320"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="cmp-title">포장영상과 일반 CCTV의 검색 시간 비교</title>
      <desc id="cmp-desc">
        포장영상은 운송장 번호로 평균 3초 만에 영상을 찾고, 일반 CCTV는
        시간대 검색으로 평균 30분 이상 소요됨을 보여주는 막대 차트.
      </desc>

      <text x="20" y="30" fontSize="16" fontWeight="700" fill="#18181b">
        해당 영상 찾는 데 걸리는 시간
      </text>

      {/* 포장영상 막대 */}
      <text x="20" y="80" fontSize="13" fontWeight="600" fill="#18181b">
        제로패킹 포장영상
      </text>
      <rect x="20" y="90" width="40" height="36" rx="4" fill="#22c55e" />
      <text x="70" y="114" fontSize="14" fontWeight="700" fill="#22c55e">
        평균 3초
      </text>

      {/* CCTV 막대 */}
      <text x="20" y="170" fontSize="13" fontWeight="600" fill="#18181b">
        일반 매장 CCTV
      </text>
      <rect x="20" y="180" width="540" height="36" rx="4" fill="#ef4444" opacity="0.85" />
      <text x="280" y="204" fontSize="14" fontWeight="700" fill="white" textAnchor="middle">
        평균 30분 이상 (시간대 추정 + 영상 스크러빙)
      </text>

      <text x="20" y="270" fontSize="12" fill="#71717a">
        포장영상은 운송장 번호 1:1 색인 → 클릭 한 번에 해당 주문 영상 재생
      </text>
      <text x="20" y="290" fontSize="12" fill="#71717a">
        CCTV는 출고 시각을 추정하고, 해당 시간대 녹화본을 직접 돌려봐야 함
      </text>
    </svg>
  );
}
