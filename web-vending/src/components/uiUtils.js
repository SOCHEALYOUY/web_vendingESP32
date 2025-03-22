// uiUtils.js
// DOM Elements
const homePage = document.getElementById("homePage");
const qrPage = document.getElementById("qrPage");
const thankYouPage = document.getElementById("thankYouPage");
const qrCodeContainer = document.getElementById("qrCodeContainer");
const qrCountdown = document.getElementById("qrCountdown");
const thankYouCountdown = document.getElementById("thankYouCountdown");

let qrTimeout;
let thankYouTimeout;

// Reset UI to home page
export function resetToHomePage() {
  clearTimeout(qrTimeout);
  clearTimeout(thankYouTimeout);

  qrCodeContainer.innerHTML = "";
  qrCountdown.textContent = "60";
  thankYouCountdown.textContent = "6";

  homePage.classList.add("active");
  qrPage.classList.remove("active");
  thankYouPage.classList.remove("active");
}

// Switch to QR page
export function showQRPage(selectedValue) {
  homePage.classList.remove("active");
  qrPage.classList.add("active");
  document.getElementById("qrValue").textContent = selectedValue;

  let qrTimeLeft = 60;
  qrCountdown.textContent = qrTimeLeft;

  qrTimeout = setTimeout(resetToHomePage, 60000);
  const interval = setInterval(() => {
    qrTimeLeft--;
    qrCountdown.textContent = qrTimeLeft;
    if (qrTimeLeft <= 0) clearInterval(interval);
  }, 1000);

  return interval;
}

// Switch to thank you page
export function showThankYouPage(onComplete) {
  qrPage.classList.remove("active");
  thankYouPage.classList.add("active");

  let thankYouTimeLeft = 6;
  thankYouCountdown.textContent = thankYouTimeLeft;

  const interval = setInterval(() => {
    thankYouTimeLeft--;
    thankYouCountdown.textContent = thankYouTimeLeft;

    if (thankYouTimeLeft <= 0) {
      clearInterval(interval);
      onComplete();
    }
  }, 1000);

  thankYouTimeout = setTimeout(() => {
    clearInterval(interval);
    onComplete();
  }, 6000);
}
