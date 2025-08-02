const admin = require("firebase-admin");
const serviceAccount = require("./cred.json")
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
// const {initializeApp} = require('firebase-admin/app');
// const {getStorage, ref , getDownloadURL, uploadBytesResumable } = require('firebase/storage');

console.log("&&&&&&&&&&&&&")
const {config} = require ('./config')

// initializeApp(config);
if (!admin.apps.length) {


  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
      storageBucket: "your-project-id.appspot.com"// optional
  });
}



 
const db = admin.firestore();
const bucket = admin.storage().bucket(); // optional if using storage

module.exports = { admin, db, bucket };