import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDvxXWZ-1D2cU8WKs4emv7lNwvI8e_87dk",
    authDomain: "bumashki-77ea3.firebaseapp.com",
    databaseURL: "https://bumashki-77ea3-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "bumashki-77ea3",
    storageBucket: "bumashki-77ea3.firebasestorage.app",
    messagingSenderId: "6476045462",
    appId: "1:6476045462:web:59ec077e80926dbcc1b6b7"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

