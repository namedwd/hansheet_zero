// Public acquisition prices only. Never use this catalog to reprice existing payments.
// Keep the ZeroPacking and Hansheet copies identical; check with test-public-pricing.mjs.
export const ANNUAL_PAID_MONTHS = 10;
export const ANNUAL_SERVICE_MONTHS = 12;
export const PUBLIC_PRICES = Object.freeze({
  KRW: Object.freeze({ currency: 'KRW', monthlyMinor: 30000, digits: 0, prefix: '', suffix: '원' }),
  USD: Object.freeze({ currency: 'USD', monthlyMinor: 2999, digits: 2, prefix: 'US$', suffix: '' }),
  JPY: Object.freeze({ currency: 'JPY', monthlyMinor: 4980, digits: 0, prefix: '¥', suffix: '' }),
  TWD: Object.freeze({ currency: 'TWD', monthlyMinor: 990, digits: 0, prefix: 'NT$', suffix: '' }),
  THB: Object.freeze({ currency: 'THB', monthlyMinor: 1190, digits: 0, prefix: '฿', suffix: '' }),
});

export function publicPrice(currency = 'USD', cycle = 'monthly', quantity = 1) {
  const price = PUBLIC_PRICES[currency];
  if (!price || !['monthly', 'yearly'].includes(cycle) || !Number.isSafeInteger(quantity) || quantity < 1) {
    throw new RangeError('Invalid public price selection');
  }
  return price.monthlyMinor * (cycle === 'yearly' ? ANNUAL_PAID_MONTHS : 1) * quantity / (10 ** price.digits);
}

export function publicMoney(currency = 'USD', cycle = 'monthly', quantity = 1) {
  const amount = publicPrice(currency, cycle, quantity);
  const price = PUBLIC_PRICES[currency];
  return price.prefix + amount.toLocaleString('en-US', {
    minimumFractionDigits: price.digits, maximumFractionDigits: price.digits,
  }) + price.suffix;
}

export const PAYMENT_GUIDANCE = Object.freeze({
  en: {
    annual: 'Annual plan: {price} for 12 months · pay for 10 months',
    title: 'Payment after your free trial',
    body: 'No automatic charge. Contact us before paying to confirm your plan and PayPal invoice arrangements. We activate the paid plan after confirming payment.',
    tax: 'Service prices shown. Any applicable taxes and the invoice currency and total are confirmed before payment. Your card issuer or PayPal may charge a currency conversion fee.',
    contact: 'Ask about payment',
  },
  vi: {
    annual: 'Gói năm: {price} cho 12 tháng · chỉ trả phí 10 tháng',
    title: 'Thanh toán sau khi dùng thử',
    body: 'Không tự động thu phí. Trước khi thanh toán, hãy liên hệ để xác nhận gói dịch vụ và việc gửi hóa đơn PayPal. Chúng tôi kích hoạt gói trả phí sau khi xác nhận đã nhận thanh toán.',
    tax: 'Giá hiển thị là phí dịch vụ. Thuế áp dụng (nếu có), loại tiền và tổng tiền trên hóa đơn sẽ được xác nhận trước khi thanh toán. Ngân hàng hoặc PayPal có thể thu phí chuyển đổi tiền tệ.',
    contact: 'Hỏi về thanh toán',
  },
  ja: {
    annual: '年間プラン：{price}で12か月利用 · 10か月分のお支払い',
    title: '無料トライアル後のお支払い',
    body: '自動課金はありません。お支払い前に、プランとPayPal請求書の手配についてお問い合わせください。入金確認後に有料プランを有効にします。',
    tax: '表示価格はサービス料金です。適用される税金、請求通貨、最終金額はお支払い前にご案内します。カード会社やPayPalによる通貨換算手数料が発生する場合があります。',
    contact: '支払いについて問い合わせる',
  },
  'zh-tw': {
    annual: '年繳方案：{price}使用12個月 · 僅付10個月費用',
    title: '免費試用後的付款方式',
    body: '不會自動扣款。付款前請聯絡我們確認方案及PayPal付款通知安排。確認收款後，我們會啟用付費方案。',
    tax: '顯示價格為服務費。適用稅金、請款幣別及最終總額會在付款前確認。發卡銀行或PayPal可能收取貨幣轉換費。',
    contact: '詢問付款方式',
  },
  th: {
    annual: 'แผนรายปี: {price} ใช้งาน 12 เดือน · ชำระเพียง 10 เดือน',
    title: 'การชำระเงินหลังทดลองใช้ฟรี',
    body: 'ไม่มีการเรียกเก็บเงินอัตโนมัติ ก่อนชำระเงิน โปรดติดต่อเพื่อยืนยันแผนและการส่งใบแจ้งหนี้ PayPal เราจะเปิดใช้งานแผนแบบชำระเงินหลังยืนยันว่าได้รับชำระแล้ว',
    tax: 'ราคาที่แสดงเป็นค่าบริการ ภาษีที่เกี่ยวข้อง สกุลเงิน และยอดรวมในใบแจ้งหนี้จะยืนยันก่อนชำระเงิน ธนาคารหรือ PayPal อาจเรียกเก็บค่าธรรมเนียมแปลงสกุลเงิน',
    contact: 'สอบถามเรื่องการชำระเงิน',
  },
});

