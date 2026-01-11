import { initializeApp } from "https://esm.sh/firebase/app";
import { getAnalytics } from "https://esm.sh/firebase/analytics";
import { getDatabase } from "https://esm.sh/firebase/database";
import { firebaseConfig } from "./constants.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export { app, analytics, db };