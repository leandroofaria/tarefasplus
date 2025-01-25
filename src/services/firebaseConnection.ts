import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Corrigido: "getFirestore"

const firebaseConfig = {
  apiKey: "AIzaSyBOVz8LWmowT514s2SymsAHc_aI10tiZeQ",
  authDomain: "tarefas-plus-5e8bb.firebaseapp.com",
  projectId: "tarefas-plus-5e8bb",
  storageBucket: "tarefas-plus-5e8bb.firebasestorage.app",
  messagingSenderId: "605500073956",
  appId: "1:605500073956:web:d6616ec87901c5cd0089f1",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp); // Nome corrigido

export { db };
