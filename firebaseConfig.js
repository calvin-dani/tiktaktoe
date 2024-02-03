import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
import { getFirestore ,collection,getDocs} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";
import { getAuth } from "firebase/auth";
// Initialize Firebase

const firebaseConfig = {
  apiKey: "AIzaSyASRTfkHkqBmKGxkbVck0ighQGVs7-oIZ0",
  authDomain: "xyz-tiktaktoe.firebaseapp.com",
  databaseURL: "https://xyz-tiktaktoe-default-rtdb.firebaseio.com",
  projectId: "xyz-tiktaktoe",
  storageBucket: "xyz-tiktaktoe.appspot.com",
  messagingSenderId: "46669508177",
  appId: "1:46669508177:web:4c453a1e707312f1e31270",
  measurementId: "G-1T9WW892YC"
};

const app = initializeApp(firebaseConfig);

// const fireStoreDb 

// console.log("FIRESTORE");
// // const RealtimeDB = getDatabase(app);
// test = async () => {
//   const querySnapshot = await getDocs(collection(fireStoreDb,'sample'));
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//   });
// }
// test();
export const fireStoreDb = getFirestore(app);
export const auth = getAuth(app)
// export default firebaseConfig;
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// console.log(db);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
