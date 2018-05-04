import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBU9TBkEHR1IYkYPrGr2NpEGHVlDX9jNlA",
    authDomain: "reactnba-3d0e0.firebaseapp.com",
    databaseURL: "https://reactnba-3d0e0.firebaseio.com",
    projectId: "reactnba-3d0e0",
    storageBucket: "reactnba-3d0e0.appspot.com",
    messagingSenderId: "952048942636"
  };

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

const firebaseLooper = (snapshot) => {
   const data = [];
   snapshot.forEach((item) => {
      data.push({
         ...item.val(),
         id:item.key
      })
   })
   return data;
}

export {
   firebase,
   firebaseDB,
   firebaseArticles,
   firebaseTeams,
   firebaseVideos,
   firebaseLooper
}
