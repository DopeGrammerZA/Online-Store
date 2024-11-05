const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'firebase-adminsdk-pc32k@online-store-f8d98.iam.gserviceaccount.com',
});

const db = admin.firestore();

module.exports = db;
