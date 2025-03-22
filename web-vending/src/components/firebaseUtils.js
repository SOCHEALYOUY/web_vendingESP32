// firebaseUtils.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyALtLFq1VXUnk9-ZW2AdfUBVF5mcMHnxU",
  authDomain: "lyouy-5c258.firebaseapp.com",
  databaseURL: "https://lyouy-5c258-default-rtdb.firebaseio.com",
  projectId: "lyouy-5c258",
  storageBucket: "lyouy-5c258.firebasestorage.app",
  messagingSenderId: "265356050235",
  appId: "1:265356050235:web:9a8df7af2ee10afa92c11e",
  measurementId: "G-NCVDZSQ1HW",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

// Save QR data to Firebase
export async function saveQRData(qrData, md5Hash, amount, value) {
  const qrRef = ref(database, "qrCodes/" + Date.now());
  await set(qrRef, {
    qrData,
    md5Hash,
    amount,
    value,
    timestamp: Date.now(),
  });
  return qrRef;
}

// Update transaction status in Firebase
export async function updateTransactionStatus(qrRef, status, value) {
  await set(qrRef, {
    transactionStatus: status,
    data: value,
    timestamp: Date.now(),
  });
}
