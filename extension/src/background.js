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

// FIREBASE DATABASE
const db = getFirestore(app);

// FIREBASE AUTH
const auth = getAuth(app);

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
    sendResponse(auth.currentUser);
  }
});

const addLink = async(title, content) => {
  return addDoc(collection(db, 'users', auth.currentUser.uid, 'links'), {
    title,
    userId: auth.currentUser.uid,
    content,
    createdAt: serverTimestamp(),
  })
};

// clicking the extension
chrome.action.onClicked.addListener(async(tab) => {
  if (!auth.currentUser) {
    chrome.runtime.openOptionsPage();
    return;
  }

  if (tab.url.startsWith('https://') || tab.url.startsWith('http://')) {
    if (tab.url.startsWith('https://www.youtube.com')) {
      const res = await getYoutubeLink(tab.id, tab.url);
      addLink(tab.title, res ?? tab.url);
    } else {
      addLink(tab.title, tab.url);
    }
  }
});
