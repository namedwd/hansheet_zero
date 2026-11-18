import Image from "next/image";
import type { Locale } from "../i18n";

// 본문 그림. 모두 글자가 없는 그림이거나 제로패킹의 실제 화면 캡처입니다(public/images, public/screens).
// 설명(alt)과 캡션은 페이지 언어를 따릅니다. 문구는 제로패킹 사이트에서 쓰는 것과 같습니다.

// 화면 캡처는 한국어·영어·일본어판만 있습니다. 다른 언어는 영어 화면에 그 언어의 캡션을 붙입니다.
const SCREEN_LANGUAGES: Locale[] = ["ko", "en", "ja"];

const PICTURES = {
  flow: { width: 1600, height: 900 },
  cctv: { width: 1600, height: 900 },
  videos: { width: 2522, height: 1733 },
  share: { width: 2032, height: 1473 },
} as const;

export type FigureName = keyof typeof PICTURES;

// [캡션, 그림 설명(alt)]
const COPY: Record<Locale, Record<FigureName, [string, string]>> = {
  ko: {
    flow: ["포장대에서 녹화하고, 주문번호와 함께 클라우드에 저장하고, 브라우저에서 재생합니다.", "포장대 위 카메라가 박스를 녹화하고, 영상이 클라우드에 저장되고, 노트북에서 재생되는 흐름"],
    cctv: ["하루치 녹화에서 주문 한 건을 찾는 것(왼쪽)과 번호로 저장된 영상을 바로 여는 것(오른쪽)", "왼쪽: CCTV의 긴 녹화 구간을 되감아 찾는 모습. 오른쪽: 번호를 입력해 주문 한 건의 영상을 여는 모습"],
    videos: ["실제 조회 화면 — 여러 번호를 한 번에 검색하고, 영상이 없는 번호도 바로 확인합니다.", "송장번호 4개를 한 번에 검색해 3개는 영상이 있고 1개는 없다고 표시된 영상 조회 화면과 공유 링크"],
    share: ["실제 공유 화면 — 고객은 링크만 열면 브라우저에서 포장 영상을 볼 수 있습니다.", "고객이 여는 공유 페이지: 주문번호와 녹화 시각이 함께 보이는 포장 영상"],
  },
  en: {
    flow: ["Recorded at the station, stored in the cloud under the order number, played in a browser.", "A camera above a packing table records a box, the video is stored in the cloud, and a person plays it on a laptop"],
    cctv: ["Looking for one order in a day of footage (left), and opening the video saved under its number (right)", "Left: a person scrolls through a long timeline of security camera footage. Right: the video of one order opens after its number is entered"],
    videos: ["The real search screen — search several numbers at once and see right away which ones have no video.", "Video search for four tracking numbers: three found, one missing, with a share link created"],
    share: ["The real share page — your customer opens the link and watches the packing video in the browser.", "Share page your customer opens: the packing video with its order number and recording time"],
  },
  ja: {
    flow: ["梱包台で録画し、注文番号とひも付けてクラウドに保存し、ブラウザで再生します。", "梱包台の上のカメラが箱を録画し、動画がクラウドに保存され、ノートPCで再生される流れ"],
    cctv: ["1日分の録画から注文1件を探す（左）と、番号で保存された動画を開く（右）", "左：防犯カメラの長い録画をさかのぼって探す様子。右：番号を入力して注文1件の動画を開く様子"],
    videos: ["実際の検索画面 — 複数の番号をまとめて検索し、動画がない番号もすぐに分かります。", "送り状番号4件をまとめて検索し、3件は該当あり・1件は該当なしと表示された動画検索画面と共有リンク"],
    share: ["実際の共有ページ — お客様はリンクを開くだけで、ブラウザで梱包動画を確認できます。", "お客様が開く共有ページ：注文番号と録画日時が表示された梱包動画"],
  },
  "zh-tw": {
    flow: ["在包裝台錄影，連同訂單編號保存到雲端，再用瀏覽器播放。", "包裝台上方的攝影機錄下紙箱，影片保存到雲端，並在筆電上播放的流程"],
    cctv: ["從一整天的錄影中找出一筆訂單（左），以及用單號直接打開已保存的影片（右）", "左：在 CCTV 的長時間錄影中來回尋找。右：輸入單號後打開一筆訂單的影片"],
    videos: ["實際搜尋畫面（英文介面）— 一次搜尋多個單號，馬上知道哪些單號沒有影片。", "一次搜尋 4 個物流單號的影片搜尋畫面：3 個有影片、1 個沒有，並已建立分享連結"],
    share: ["實際分享頁面（英文介面）— 顧客只要打開連結，就能在瀏覽器觀看包裝影片。", "顧客開啟的分享頁面：顯示訂單編號與錄影時間的包裝影片"],
  },
  vi: {
    flow: ["Quay tại bàn đóng gói, lưu trên đám mây kèm mã đơn hàng, và xem lại trên trình duyệt.", "Camera phía trên bàn đóng gói quay chiếc hộp, video được lưu trên đám mây và phát lại trên máy tính xách tay"],
    cctv: ["Tìm một đơn hàng trong bản ghi cả ngày (trái) và mở ngay video đã lưu theo mã (phải)", "Trái: tua lại đoạn ghi hình CCTV dài để tìm. Phải: nhập mã và mở video của một đơn hàng"],
    videos: ["Màn hình tìm kiếm thực tế (giao diện tiếng Anh) — tìm nhiều mã cùng lúc và biết ngay mã nào chưa có video.", "Màn hình tìm video theo 4 mã vận đơn: 3 mã có video, 1 mã không có, kèm liên kết chia sẻ"],
    share: ["Trang chia sẻ thực tế (giao diện tiếng Anh) — khách hàng chỉ cần mở liên kết để xem video đóng gói trên trình duyệt.", "Trang chia sẻ khách hàng mở: video đóng gói kèm mã đơn và thời gian quay"],
  },
};

function source(name: FigureName, locale: Locale): string {
  if (name === "flow") return "/images/flow.webp";
  if (name === "cctv") return "/images/cctv-vs-clip.webp";
  return `/screens/${SCREEN_LANGUAGES.includes(locale) ? locale : "en"}/${name}.webp`;
}

export function figureCaption(name: FigureName, locale: Locale): string {
  return COPY[locale][name][0];
}

export function SiteImage({
  name,
  locale,
  className = "h-auto w-full rounded-2xl border border-zinc-200 dark:border-zinc-800",
}: {
  name: FigureName;
  locale: Locale;
  className?: string;
}) {
  return (
    <Image
      src={source(name, locale)}
      alt={COPY[locale][name][1]}
      width={PICTURES[name].width}
      height={PICTURES[name].height}
      sizes="(max-width: 768px) 100vw, 768px"
      className={className}
    />
  );
}
