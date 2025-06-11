import {
    initializeApp,
    getApp,
    getApps, 
    cert,
    App
} from 'firebase-admin/app'

import { getFirestore } from 'firebase-admin/firestore'

// import serviceKey from "@/../service_key.json";

const serviceKey = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_CONFIG!)

let app: App

if (getApps().length === 0) {
    app = initializeApp({
        credential: cert(serviceKey as any),
    });
} else {
    app = getApp();
}

const adminDB = getFirestore(app);

export { app as adminApp, adminDB };
