# Switch Over Mobile

This app lets you access and get notified of links saved to your account. When you receive a notification in the background or open the link on the app, it is automatically deleted from your account. 

**Make sure to enable notifications for this app.**

## Development Setup
 Install dependencies
 ```
 yarn
 ```

Run the project on Android with
```
yarn android
```

### Environment Setup

Get the  `google-services.json` from creating an Android app in a Firebase project and place it in `android/app/`.

Create a '.env' file with the OAuth Client to allow Google Login with the app.
