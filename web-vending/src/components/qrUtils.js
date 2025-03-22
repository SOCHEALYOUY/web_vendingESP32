// qrUtils.js
import { BakongKHQR, khqrData, IndividualInfo } from "bakong-khqr";
import QRCode from "qrcode";

// Generate Bakong QR code
export async function generateQRCode(amount) {
  const individualInfo = new IndividualInfo(
    "lyouy_sochea@aclb",
    "lyouy_sochea",
    "PHNOM PENH",
    {
      currency: khqrData.currency.khr,
      amount,
      mobileNumber: "",
      storeLabel: "",
      terminalLabel: "",
      purposeOfTransaction: "",
      languagePreference: "",
      merchantNameAlternateLanguage: "",
      merchantCityAlternateLanguage: "",
    }
  );

  const KHQR = new BakongKHQR();
  const qrResult = KHQR.generateIndividual(individualInfo);

  if (!qrResult?.data) throw new Error("Failed to generate QR code");

  // Convert QR data to canvas
  const canvas = await QRCode.toCanvas(qrResult.data.qr, { width: 200 });
  return { canvas, qrData: qrResult.data };
}
