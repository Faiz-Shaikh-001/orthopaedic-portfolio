import {
  initializeApp,
} from "firebase/app";

import {
  connectFirestoreEmulator,
  getFirestore,
} from "firebase/firestore";

import {
  getStorage,
} from "firebase/storage";


const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY,

  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,

  projectId:
    import.meta.env.VITE_FIREBASE_PROJECT_ID,

  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,

  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,

  appId:
    import.meta.env.VITE_FIREBASE_APP_ID,

  measurementId:
    import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};


const app =
  initializeApp(firebaseConfig);

const db =
  getFirestore(app);

const storage =
  getStorage(app);


const useFirestoreEmulator =
  import.meta.env.VITE_USE_FIREBASE_EMULATOR ===
  "true";


if (useFirestoreEmulator) {
  console.log(
    "Connecting to local Firestore emulator"
  );

  connectFirestoreEmulator(
    db,
    "localhost",
    8080
  );
}


export {
  app,
  db,
  storage,
};