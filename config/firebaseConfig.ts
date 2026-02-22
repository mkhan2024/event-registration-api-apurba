import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function initFirebase() {
  if (getApps().length) return;

  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!json) throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_JSON env var");

  let serviceAccount: any;
  try {
    serviceAccount = JSON.parse(json);
  } catch {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON must be valid JSON");
  }

  initializeApp({
    credential: cert(serviceAccount),
  });
}

initFirebase();

export const auth = getAuth();
export const db = getFirestore();