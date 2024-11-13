import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'; // Import Firebase Storage

dotenv.config();
const FirebaseConstants = {
    apiKey: process.env.FIREBASE_API_KEY || '',
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.FIREBASE_APP_ID || '',
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || '',
    databaseURL: process.env.FIREBASE_DATABASE_URL || '',
};

export const app = initializeApp(FirebaseConstants);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Initialize Firebase Storage

export const fileUpload = async (
    file: Express.Multer.File,
    url: string,
): Promise<string> => {
    const storageRef = ref(storage, url);
    const buffer = file.buffer;

    await uploadBytes(storageRef, buffer);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
};
