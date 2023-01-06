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
        return new Promise(() => {});
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
