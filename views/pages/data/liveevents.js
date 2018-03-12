var user, profilePicture, profileName, profileButton, pictureInProfile, nameInProfile;
var beginButton, correctButton;
var oldScore, newScore;
var signOutButton;
var currentUID;
var nameString;
var listeningFirebaseRefs = [];

var config = {
  apiKey: "AIzaSyAtlo66pxNfHMxMVwL7MXNkblK1lanJgk4",
  authDomain: "project6c613.firebaseapp.com",
  databaseURL: "https://project6c613.firebaseio.com",
  projectId: "project6c613",
  storageBucket: "project6c613.appspot.com",
  messagingSenderId: "1082078319138"
};

firebase.initializeApp(config);

function onAuthStateChanged(user) {
  // We ignore token refresh events.
  if (user && currentUID === user.uid) {
    return;
  }

  if (user) {
    currentUID = user.uid;
    databaseQueries();
    console.log(currentUID);
  } else {
    // Set currentUID to null.
    currentUID = null;
    //setTimeout(function(){ window.location.href = "index.html"; }, 2000);
  }
}

function databaseQueries() {
  var myUserId = firebase.auth().currentUser.uid;
  var liveEventsRef = firebase.database().ref('/events/');


  var eventIDs = firebase.database().ref('/events/');
  eventIDs.once('value', getEventData);
  function getEventData(snapshot){
    console.log(snapshot.val());
    snapshot.forEach(eventSnapshot => {
      var live = eventSnapshot.val().live;
      console.log(live);
      if(live) {
        console.log(eventSnapshot.val().details);
        eventSnapshot.forEach(detailsSnapshot => {
          console.log(detailsSnapshot.val());
        });
      }
    })
  }
      // if(data.val().live){
      //   console.log("Repeater Added");
        // javascript:(function() {
        //   $axure('@liveeventsrepeater').addRepeaterData([
        //     {
        //       name: {type: 'text', text: 'hello'},
        //     }
        //   ]).refreshRepeater();
        // })();

  // Fetching and displaying all posts of each sections.

  // Keep track of all Firebase refs we are listening to.
  listeningFirebaseRefs.push(liveEventsRef);
}


$(document).ready(function() {
    console.log( "Live Events Loaded" );
    signOutButton = document.getElementById('u121');
    signOutButton.onclick = function() {
      firebase.auth().signOut();
    }

  firebase.auth().onAuthStateChanged(onAuthStateChanged);
});
