import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey : import.meta.env.VITE_apiKey,
    authDomain: `${import.meta.env.VITE_projectId}.firebaseapp.com`,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: `${import.meta.env.VITE_projectId}.firebasestorage.app`,
    appId : import.meta.env.VITE_appId,
    messagingSenderId : import.meta.env.VITE_messagingSenderId
}


// Initialize Firebase
export const app = initializeApp(firebaseConfig);