// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import * as firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'; // If using Firebase database
import 'firebase/storage';
import "firebase/messaging";
export const environment = {
  production: true,
  firebase:{
    apiKey: "AIzaSyDn4kcXwiTTi3H-5QwwsoH6WBGuXX6xv6k",
    authDomain: "travelgram-bdeeb.firebaseapp.com",
    databaseURL: "https://travelgram-bdeeb.firebaseio.com",
    projectId: "travelgram-bdeeb",
    storageBucket: "travelgram-bdeeb.appspot.com",
    messagingSenderId: "132441634967",
    appId: "1:132441634967:web:6d541d1a8fc74ac8c211d2"
  },
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
