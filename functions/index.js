const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config());

// When a new user is created through Firebase Auth, add a new user document to
// Firestore.
exports.newUser = functions.auth.user().onCreate((user) => {
  return admin.firestore().collection("users").doc(user.uid).set({
    email: user.email,
    name: user.displayName,
  });
});

// When a new link is added for the user, create notification message to send
// to userId's devices.
exports.addLink = functions.firestore
    .document("users/{userId}/links/{linkId}")
    .onCreate(async (snap, context) => {
      const newLink = snap.data();
      const tokensRes = await admin.firestore()
          .collection("users")
          .doc(context.params.userId)
          .collection("tokens").get();

      const tokens = tokensRes.docs.map((x) => x.id);
      functions.logger.log("User tokens", tokens);
      if (!tokens) {
        functions.logger.log("User has no devices.");
        return null;
      }

      const message = {
        notification: {
          title: newLink.title,
          body: newLink.content,
        },
        data: {linkId: context.params.linkId},
      };
      return admin.messaging().sendToDevice(tokens, message);
    });
