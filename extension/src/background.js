import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from 'firebase/firestore';
import {
  getAuth,
  signInWithCredential,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth';
import { FIREBASE_CONFIG } from './firebase.config';
import { getYoutubeLink } from './content/youtube';

const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);
const db = getFirestore(app);

// listeners for messages
chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.command === 'sign-in') {
    signInWithCredential(
      auth,
      GoogleAuthProvider.credential(null, message.token)
    )
      .then((res) => {
        sendResponse(res);
      })
      .catch((err) => {
        console.error(err);
        sendResponse(null);
      });
    return true;
  } else if (message.command === 'sign-out') {
    signOut(auth)
      .then(() => {
        sendResponse(true);
      })
      .catch((err) => {
        console.error(err);
        sendResponse(false);
      });
    return true;
  } else if (message.command === 'check-signin') {
    auth.onAuthStateChanged(user => {
      sendResponse(user ? user.email : null);
    });
  }
});

const addLink = async(title, content, uid) => {
  addDoc(collection(db, 'users', uid, 'links'), {
    title,
    userId: uid,
    content,
    createdAt: serverTimestamp(),
  }).then(() => {
    console.log('added');
  });
};

chrome.action.onClicked.addListener(async(tab) => {
  auth.onAuthStateChanged(async user => {
    if (tab.url.startsWith('https://') || tab.url.startsWith('http://')) {
      if (tab.url.startsWith('https://www.youtube.com')) {
        const res = await getYoutubeLink(tab.id, tab.url);
        addLink(tab.title, res ?? tab.url, user.uid);
      } else {
        addLink(tab.title, tab.url, user.uid);
      }
    }
  });
});
