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

// Message listeners to sign-in and sign-out of Firebase from options page.
chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.command === 'sign-in') {
    signInWithCredential(
      auth,
      GoogleAuthProvider.credential(null, message.token)
    )
      .then((res) => {
        chrome.storage.local.set({ user: res.user.email });
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
        chrome.storage.local.remove('user');
        sendResponse(true);
      })
      .catch((err) => {
        console.error(err);
        sendResponse(false);
      });
    return true;
  }
});

// Create a new link document for the user.
const addLink = async(title, content, uid) => {
  addDoc(collection(db, 'users', uid, 'links'), {
    title,
    userId: uid,
    content,
    createdAt: serverTimestamp(),
  });
};

// On click extension button listener. Extract the URL of the current tab.
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
