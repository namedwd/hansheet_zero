import Image from "next/image";
import type { Locale } from "../i18n";

// "준비물" 한 장. 포장대 그림 위에 번호를 찍고, 같은 번호의 이름을 아래에 적습니다.
// 그림에는 글자가 없어서 모든 언어가 같은 파일을 씁니다(public/images/needs-table.webp).
// 문구와 번호 위치는 제로패킹 첫 화면과 같습니다(zeroweb lib/home-content.js HOME_NEEDS,
// components/HomeOverview.js NEED_MARKERS). 한쪽만 고치지 마세요.

// 번호가 놓이는 자리: 그림 너비·높이에 대한 퍼센트. 순서는 PC, 웹캠, 거치대, 스캐너, 송장.
const MARKERS: [number, number][] = [[81.5, 34], [58, 15.5], [22, 22], [12, 45], [57.5, 48.5]];

type Copy = { title: string; notNeeded: string; without: [string, string, string]; items: [string, string][] };

const COPY: Record<Locale, Copy> = {
  ko: {
    title: "준비물은 이것뿐입니다",
    notNeeded: "없어도 됩니다",
    without: ["전용 장비", "WMS", "설치 기사 방문"],
    items: [
      ["Windows 10/11 PC", "포장대에 둘 노트북이나 데스크톱. Mac은 아직 지원하지 않습니다."],
      ["USB 웹캠", "일반 USB 웹캠을 작업대를 위에서 내려다보도록 설치합니다."],
      ["카메라 거치대", "책상 모서리에 집게로 고정하는 암. 약 70cm 높이에서 내려다봅니다."],
      ["바코드 스캐너", "키보드처럼 입력되는 유선·무선 스캐너면 됩니다."],
      ["평소 쓰는 송장", "출력하던 송장의 바코드를 그대로 스캔합니다. CJ대한통운, 한진, 롯데, 우체국 등"],
    ],
  },
  en: {
    title: "Everything you need",
    notNeeded: "You do not need",
    without: ["Special equipment", "A WMS", "An installer visit"],
    items: [
      ["Windows 10 or 11 PC", "A laptop or desktop at the packing table. Mac is not supported yet."],
      ["USB webcam", "Any standard USB webcam, mounted to look down at the table."],
      ["Camera arm", "A clamp arm fixed to the table edge, about 70 cm (28 in) above the table."],
      ["Barcode scanner", "A USB or wireless scanner that types the code like a keyboard."],
      ["Your shipping labels", "Scan the tracking barcode you already print: Shopify, ShipStation, USPS, UPS or FedEx."],
    ],
  },
  ja: {
    title: "ご用意いただくもの",
    notNeeded: "不要なもの",
    without: ["専用機器", "WMS", "設置業者の訪問"],
    items: [
      ["Windows 10/11のPC", "梱包台に置くノートPCまたはデスクトップ。Macには未対応です。"],
      ["USBウェブカメラ", "一般的なUSBウェブカメラを作業台を上から映すように設置します。"],
      ["カメラアーム", "クランプで作業台の端に固定するアーム。約70cmの高さから見下ろします。"],
      ["バーコードスキャナー", "キーボードのように入力できるUSB・ワイヤレススキャナー。"],
      ["いつもの送り状", "印刷している送り状のバーコードをそのまま使えます。ヤマト運輸、佐川急便、日本郵便など"],
    ],
  },
  "zh-tw": {
    title: "需要準備的設備",
    notNeeded: "不需要",
    without: ["專用設備", "WMS", "到府安裝"],
    items: [
      ["Windows 10/11 電腦", "放在包裝桌的筆電或桌機，目前尚不支援 Mac。"],
      ["USB 網路攝影機", "一般 USB 網路攝影機，由上往下拍攝桌面。"],
      ["攝影機支架", "夾在桌邊的懸臂支架，距桌面約 70 公分高。"],
      ["條碼掃描器", "能像鍵盤一樣輸入的 USB 或無線掃描器。"],
      ["平常使用的出貨單", "直接掃描平常列印的物流單號條碼：蝦皮、黑貓宅急便、新竹物流、7-11 交貨便等"],
    ],
  },
  vi: {
    title: "Bạn chỉ cần chuẩn bị",
    notNeeded: "Không cần",
    without: ["Thiết bị chuyên dụng", "WMS", "Kỹ thuật viên đến lắp đặt"],
    items: [
      ["Máy tính Windows 10/11", "Laptop hoặc máy bàn đặt tại bàn đóng gói. Chưa hỗ trợ Mac."],
      ["Webcam USB", "Webcam USB thông thường, gắn hướng từ trên xuống mặt bàn."],
      ["Tay đỡ camera", "Tay kẹp gắn vào mép bàn, cao khoảng 70 cm so với mặt bàn."],
      ["Máy quét mã vạch", "Máy quét USB hoặc không dây, nhập mã như bàn phím."],
      ["Phiếu gửi hàng bạn vẫn in", "Quét mã vận đơn trên phiếu gửi hàng bạn vẫn in: Shopee, Lazada, TikTok Shop, GHN, GHTK, J&T…"],
    ],
  },
};

const BADGE =
  "flex h-7 w-7 flex-none items-center justify-center rounded-full bg-blue-600 text-sm font-semibold leading-none text-white";

export function NeedsFigure({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  return (
    <section className="mb-16" data-needs-figure>
      <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
        {copy.title}
      </h2>
      <div className="relative mt-6 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <Image
          src="/images/needs-table.webp"
          alt={copy.items.map(([name]) => name).join(", ")}
          width={1536}
          height={1024}
          sizes="(max-width: 768px) 100vw, 768px"
          className="h-auto w-full"
        />
        {MARKERS.map(([x, y], index) => (
          <span
            key={index}
            aria-hidden="true"
            className={`${BADGE} absolute -translate-x-1/2 -translate-y-1/2 shadow-[0_0_0_3px_rgba(255,255,255,0.9)]`}
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {index + 1}
          </span>
        ))}
      </div>
      <ol className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {copy.items.map(([name, text], index) => (
          <li key={name} className="flex items-start gap-3">
            <span aria-hidden="true" className={BADGE}>
              {index + 1}
            </span>
            <div>
              <h3 className="text-base font-semibold text-black dark:text-zinc-50">{name}</h3>
              <p className="mt-0.5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{text}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-6 flex flex-wrap items-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm dark:border-zinc-800 dark:bg-zinc-950">
        <strong className="mr-1 font-semibold text-black dark:text-zinc-50">{copy.notNeeded}</strong>
        {copy.without.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
          >
            <span aria-hidden="true" className="text-red-500">
              ✕
            </span>
            {item}
          </span>
        ))}
      </p>
    </section>
  );
}
