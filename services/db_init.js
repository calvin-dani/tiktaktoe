import { initializeApp } from "firebase/app";
import { addDoc, getDocs, collection, getFirestore } from "firebase/firestore";
import { Database, getDatabase } from "firebase/database";
import { fireBaseConfig } from "../firebaseConfig";

// Initialize Firebase
const app = initializeApp(fireBaseConfig);

// Initialize Realtime Database and get a reference to the service
const fireStoreDb = getFirestore(app);

const RealtimeDB = getDatabase(app);

export default { fireStoreDb, RealtimeDB };
