const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "process.env.FIREBASE_API",
  authDomain: "image-upload-28244.firebaseapp.com",
  projectId: "image-upload-28244",
  storageBucket: "image-upload-28244.appspot.com",
  messagingSenderId: "104735179238",
  appId: "1:104735179238:web:e26f8a72e2537505049627",
};

const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
module.exports = getStorage(firebaseApp);
