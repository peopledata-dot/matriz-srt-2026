import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB2k-WOoIy_hSnzlkClaf7DCL3ERTbs-Qg",
  authDomain: "matriz-srt-2026.firebaseapp.com",
  databaseURL: "https://matriz-srt-2026-default-rtdb.firebaseio.com",
  projectId: "matriz-srt-2026",
  storageBucket: "matriz-srt-2026.appspot.com",
  messagingSenderId: "529048990599",
  appId: "1:529048990599:web:787453dd2185ea06801922"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
