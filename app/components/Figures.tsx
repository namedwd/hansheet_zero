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
  compare: { width: 1600, height: 800 },
  link: { width: 1600, height: 819 },
  claim: { width: 1400, height: 933 },
} as const;

export type FigureName = keyof typeof PICTURES;

// [캡션, 그림 설명(alt)]
const COPY: Record<Locale, Record<FigureName, [string, string]>> = {
  ko: {
    flow: ["포장대에서 녹화하고, 주문번호와 함께 클라우드에 저장하고, 브라우저에서 재생합니다.", "포장대 위 카메라가 박스를 녹화하고, 영상이 클라우드에 저장되고, 노트북에서 재생되는 흐름"],
    cctv: ["하루치 녹화에서 주문 한 건을 찾는 것(왼쪽)과 번호로 저장된 영상을 바로 여는 것(오른쪽)", "왼쪽: CCTV의 긴 녹화 구간을 되감아 찾는 모습. 오른쪽: 번호를 입력해 주문 한 건의 영상을 여는 모습"],
    videos: ["실제 조회 화면 — 여러 번호를 한 번에 검색하고, 영상이 없는 번호도 바로 확인합니다.", "송장번호 4개를 한 번에 검색해 3개는 영상이 있고 1개는 없다고 표시된 영상 조회 화면과 공유 링크"],
    share: ["실제 공유 화면 — 고객은 링크만 열면 브라우저에서 포장 영상을 볼 수 있습니다.", "고객이 여는 공유 페이지: 주문번호와 녹화 시각이 함께 보이는 포장 영상"],
    compare: ["휴대폰을 들고 찍는 방식(왼쪽)과, 포장대 위 카메라가 찍어 두 손이 자유로운 방식(오른쪽)", "왼쪽: 한 손으로 휴대폰을 들고 다른 손으로 상자에 옷을 넣는 모습. 오른쪽: 거치대의 카메라가 내려다보는 포장대에서 두 손으로 포장하는 모습"],
    link: ["쇼핑몰의 주문, 포장대의 촬영, 클라우드의 영상이 번호 하나로 이어집니다.", "쇼핑몰 화면에서 포장대로, 포장대에서 재생 버튼이 있는 클라우드로 이어지는 흐름"],
    claim: ["고객 문의에 포장 영상 링크 하나로 답합니다.", "열린 택배 상자 옆에서, 문의 메시지에 영상 링크로 답장하는 휴대폰 화면"],
  },
  en: {
    flow: ["Recorded at the station, stored in the cloud under the order number, played in a browser.", "A camera above a packing table records a box, the video is stored in the cloud, and a person plays it on a laptop"],
    cctv: ["Looking for one order in a day of footage (left), and opening the video saved under its number (right)", "Left: a person scrolls through a long timeline of security camera footage. Right: the video of one order opens after its number is entered"],
    videos: ["The real search screen — search several numbers at once and see right away which ones have no video.", "Video search for four tracking numbers: three found, one missing, with a share link created"],
    share: ["The real share page — your customer opens the link and watches the packing video in the browser.", "Share page your customer opens: the packing video with its order number and recording time"],
    compare: ["Filming by hand on a phone (left), and a camera above the table that leaves both hands free (right)", "Left: one hand holds a phone while the other puts a garment in a box. Right: two hands pack at a table under a camera on an arm"],
    link: ["The store's order, the recording at the table and the video in the cloud are tied together by one number.", "A flow from an online store screen to a packing table, and from the table to a cloud with a play button"],
    claim: ["Answer a customer's message with one packing video link.", "Next to an opened parcel, a phone screen replies to a message with a video link"],
  },
  ja: {
    flow: ["梱包台で録画し、注文番号とひも付けてクラウドに保存し、ブラウザで再生します。", "梱包台の上のカメラが箱を録画し、動画がクラウドに保存され、ノートPCで再生される流れ"],
    cctv: ["1日分の録画から注文1件を探す（左）と、番号で保存された動画を開く（右）", "左：防犯カメラの長い録画をさかのぼって探す様子。右：番号を入力して注文1件の動画を開く様子"],
    videos: ["実際の検索画面 — 複数の番号をまとめて検索し、動画がない番号もすぐに分かります。", "送り状番号4件をまとめて検索し、3件は該当あり・1件は該当なしと表示された動画検索画面と共有リンク"],
    share: ["実際の共有ページ — お客様はリンクを開くだけで、ブラウザで梱包動画を確認できます。", "お客様が開く共有ページ：注文番号と録画日時が表示された梱包動画"],
    compare: ["スマホを手に持って撮る方法（左）と、梱包台の上のカメラが撮るので両手が空く方法（右）", "左：片手でスマホを持ち、もう一方の手で箱に服を入れる様子。右：アームのカメラが見下ろす梱包台で、両手で梱包する様子"],
    link: ["ショップの注文、梱包台での録画、クラウドの動画が1つの番号でつながります。", "ショップ画面から梱包台へ、梱包台から再生ボタンのあるクラウドへ続く流れ"],
    claim: ["お客様からの問い合わせに、梱包動画のリンク1つで回答します。", "開いた荷物の横で、問い合わせメッセージに動画リンクで返信するスマホ画面"],
  },
  "zh-tw": {
    flow: ["在包裝台錄影，連同訂單編號保存到雲端，再用瀏覽器播放。", "包裝台上方的攝影機錄下紙箱，影片保存到雲端，並在筆電上播放的流程"],
    cctv: ["從一整天的錄影中找出一筆訂單（左），以及用單號直接打開已保存的影片（右）", "左：在 CCTV 的長時間錄影中來回尋找。右：輸入單號後打開一筆訂單的影片"],
    videos: ["實際搜尋畫面（英文介面）— 一次搜尋多個單號，馬上知道哪些單號沒有影片。", "一次搜尋 4 個物流單號的影片搜尋畫面：3 個有影片、1 個沒有，並已建立分享連結"],
    share: ["實際分享頁面（英文介面）— 顧客只要打開連結，就能在瀏覽器觀看包裝影片。", "顧客開啟的分享頁面：顯示訂單編號與錄影時間的包裝影片"],
    compare: ["手持手機拍攝（左），以及由包裝台上方攝影機拍攝、雙手可自由作業（右）", "左：一手拿手機、另一手把衣服放進紙箱。右：在支架攝影機俯拍的包裝台上用雙手包裝"],
    link: ["商店的訂單、包裝台的錄影與雲端的影片，以同一組單號串連。", "從網路商店畫面到包裝台，再到有播放鍵的雲端的流程"],
    claim: ["用一個包裝影片連結回覆顧客的詢問。", "在打開的包裹旁，手機畫面以影片連結回覆詢問訊息"],
  },
  vi: {
    flow: ["Quay tại bàn đóng gói, lưu trên đám mây kèm mã đơn hàng, và xem lại trên trình duyệt.", "Camera phía trên bàn đóng gói quay chiếc hộp, video được lưu trên đám mây và phát lại trên máy tính xách tay"],
    cctv: ["Tìm một đơn hàng trong bản ghi cả ngày (trái) và mở ngay video đã lưu theo mã (phải)", "Trái: tua lại đoạn ghi hình CCTV dài để tìm. Phải: nhập mã và mở video của một đơn hàng"],
    videos: ["Màn hình tìm kiếm thực tế (giao diện tiếng Anh) — tìm nhiều mã cùng lúc và biết ngay mã nào chưa có video.", "Màn hình tìm video theo 4 mã vận đơn: 3 mã có video, 1 mã không có, kèm liên kết chia sẻ"],
    share: ["Trang chia sẻ thực tế (giao diện tiếng Anh) — khách hàng chỉ cần mở liên kết để xem video đóng gói trên trình duyệt.", "Trang chia sẻ khách hàng mở: video đóng gói kèm mã đơn và thời gian quay"],
    compare: ["Cầm điện thoại để quay (trái) và camera phía trên bàn đóng gói tự quay, hai tay rảnh để đóng gói (phải)", "Trái: một tay cầm điện thoại, tay kia đặt áo vào hộp. Phải: hai tay đóng gói tại bàn có camera gắn trên tay đỡ nhìn xuống"],
    link: ["Đơn hàng của cửa hàng, video quay tại bàn đóng gói và video trên đám mây được nối với nhau bằng một mã.", "Luồng từ màn hình cửa hàng trực tuyến đến bàn đóng gói, rồi đến đám mây có nút phát"],
    claim: ["Trả lời thắc mắc của khách bằng một liên kết video đóng gói.", "Bên cạnh kiện hàng đã mở, màn hình điện thoại trả lời tin nhắn bằng liên kết video"],
  },
};

function source(name: FigureName, locale: Locale): string {
  if (name === "flow") return "/images/flow.webp";
  if (name === "cctv") return "/images/cctv-vs-clip.webp";
  if (name === "compare") return "/images/compare-phone-vs-station.webp";
  if (name === "link") return "/images/link-flow.webp";
  if (name === "claim") return "/images/claim-reply.webp";
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
