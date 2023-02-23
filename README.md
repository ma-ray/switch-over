# Switch Over

> A way to send links to Android devices

![demo](https://user-images.githubusercontent.com/60418739/211477404-a7482540-71b9-4b66-ba63-f61609d0641a.gif)

## Usage
Switch Over is a simple and quick way to send links from your Chrome browser to your Android phone.
This is done through a Chrome browser extension, an Android app, and your Google account.

If you're watching YouTube videos on Chrome, you can use Switch Over to send the video link to your phone along with the current timestamp so you can resume right where you left off.

This could be used as kind of mobile bookmarks, but the purpose of this project is to take what you have on your browser and switch over to your phone.

### Chrome Extension 
#### Installation
Head to the [extension folder](./extension) for instructions on how to build.

#### Usage
After successfully installing the extension, head over to the options page and sign in with your Google account to start sending links.

On any webpage, pressing the extension's icon from the toolbar will store the link on your account and the mobile app will notify you of the new link.

### Mobile App
> **To get notified of new links, head to Android settings and enable notifications.**

Head to the [mobile folder](./mobile/) to see instructions on how to build the app.

After signing in, you will see a list of currently stored links received from the browser that changes in real time.
Tapping on any item, will open the link on your phone's browser and will be swiftly removed from your account.

You will also receive a notification if a new link is added. Tapping on it will open the link on your browser and also remove the link from your account.

## Technologies Used
* The Chrome Extension has been built for Manifest V3
* Firebase Authentication, Cloud Firestore, Cloud Functions, Cloud Messaging
* React Native for the mobile app
