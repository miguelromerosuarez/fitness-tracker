import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Asegurar que Firestore está importado

const firebaseConfig = {
    apiKey: "AIzaSyC1pzXpq_BvES9j2Exr5KpmwEjRcF9wnOs",
    authDomain: "fitnesstracker-4488c.firebaseapp.com",
    projectId: "fitnesstracker-4488c",
    storageBucket: "fitnesstracker-4488c.firebasestorage.app",
    messagingSenderId: "895168275825",
    appId: "1:895168275825:web:6c2d024fd6890a60f942d0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
