import { notFound } from "next/navigation";

// 어느 페이지에도 해당하지 않는 주소는 여기로 와서 404 화면(app/(ko)/not-found.tsx)을 보여 줍니다.
// 언어별 루트 레이아웃으로 나눈 뒤에는 app/not-found.tsx 를 둘 수 없어 이 파일이 그 역할을 합니다.
export default function UnknownPage() {
  notFound();
}
