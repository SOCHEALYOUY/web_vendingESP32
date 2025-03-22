//////////////////////////
// script.js
import {
  app,
  database,
  saveQRData,
  updateTransactionStatus,
} from "./components/firebaseUtils.js";
import { generateQRCode } from "./components/qrUtils.js";
import {
  pollTransactionStatus,
  checkTransactionStatus,
} from "./components/transactionUtils.js";
import {
  resetToHomePage,
  showQRPage,
  showThankYouPage,
} from "./components/uiUtils.js";

document.querySelectorAll(".amountButton").forEach((button) => {
  button.addEventListener("click", async () => {
    try {
      const selectedAmount = parseInt(button.dataset.amount);
      const selectedValue = parseInt(button.dataset.value);

      // Show QR page
      const qrInterval = showQRPage(selectedValue);

      // Generate QR code
      const { canvas, qrData } = await generateQRCode(selectedAmount);
      const qrRef = await saveQRData(
        qrData.qr,
        qrData.md5,
        selectedAmount,
        selectedValue
      );

      // Display QR code
      const qrCodeContainer = document.getElementById("qrCodeContainer");
      qrCodeContainer.innerHTML = "";
      qrCodeContainer.appendChild(canvas);

      // Poll transaction status
      pollTransactionStatus(
        qrData.md5,
        qrRef,
        selectedValue,
        async (ref, value) => {
          await updateTransactionStatus(ref, "success", value);

          // Show thank you page
          showThankYouPage(() => resetToHomePage());
        }
      );
    } catch (error) {
      alert(`Error: ${error.message}`);
      resetToHomePage();
    }
  });
});

console.log("Hi");
