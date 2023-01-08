# Switch Over Extension
 
 The Switch Over Chrome extension allows you to send the links from your Chrome browser to Switch Over mobile app using your Google account.

 Pressing the extension's icon will send the link on the tab you are currently on to the mobile app.

 If you are on a YouTube video, the extension will also send the progress of the video.

## Development Setup
Install dependencies with
```
npm install
```
Build the project with a reloader with
```
npm start
```
If you want to build the project without the reloader use
```
npm run build
```

### Environment Variables
Create a new web app in a Firebase project and save the config as `firebase.config.js`. An example is below:

```
export const FIREBASE_CONFIG = {
  apiKey: 'API_KEY_HERE',
  authDomain: 'AUTH_DOMAIN_HERE',
  projectId: 'PROJECT_ID_HERE',
  storageBucket: 'STORAGE_BUCKET_HERE',
  messagingSenderId: 'MESSAGING_SENDER_ID_HERE',
  appId: 'APP_ID_HERE'
};
```

For `manifest.json` it is the same as `manifest.example.json` but you need the OAuth2 client id
which can be retrieved from [here](https://developer.chrome.com/docs/extensions/mv3/tut_oauth/#oauth_client). The [key](https://developer.chrome.com/docs/extensions/mv3/tut_oauth/#upload_to_dashboard) is also needed by uploading to the developer dashboard.

### Using the build
In Chrome, head to the extensions page `chrome://extensions/` and enable Developer mode on the top right.

Press `Load unpacked` and select the `dist` folder in the current working directory to use the extension.
