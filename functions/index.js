const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config());

exports.newUser = functions.auth.user().onCreate((user) => {
  // create new document on firestore
  return admin.firestore().collection("users").doc(user.uid).set({
    email: user.email,
    name: user.displayName,
  });
});
