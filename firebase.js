const {initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
// const { getAnalytics } = require('firebase/analytics');



const serviceAccount = require('./cred.json');
const {admin, credential } = require('firebase-admin');

  initializeApp({
    credential: cert(serviceAccount),
  storageBucket: "gs://dhat-f664f.firebasestorage.app",
  });
 
  const db = getFirestore()
  
  // admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount),
  //   storageBucket: "gs://dhat-f664f.firebasestorage.app",
  // });


  module.exports = { db , serviceAccount, initializeApp }