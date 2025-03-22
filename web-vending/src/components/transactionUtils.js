// transactionUtils.js
import { BAKONG_API_TOKEN } from "./authConfig.js";

// Check transaction status using Bakong API
export async function checkTransactionStatus(md5Hash) {
  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${BAKONG_API_TOKEN}`,
  });

  const response = await fetch(
    "https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5",
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ md5: md5Hash }),
    }
  );

  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  return await response.json();
}

// Poll transaction status every second
export function pollTransactionStatus(
  md5Hash,
  qrRef,
  selectedValue,
  onComplete
) {
  const interval = setInterval(async () => {
    try {
      const result = await checkTransactionStatus(md5Hash);

      if (result?.responseCode === 0) {
        clearInterval(interval);
        await onComplete(qrRef, selectedValue);
      }
    } catch (error) {
      console.error(error);
      clearInterval(interval);
    }
  }, 1000);

  return interval;
}
