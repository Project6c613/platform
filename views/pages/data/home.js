var loginButton = document.getElementById('cache1');
var loginParticipant = document.getElementById('u16');
var loginHost = document.getElementById('u18');
var loginUserNameInput = document.getElementById('u38_input');
var loginPasswordInput = document.getElementById('u33_input');
var loginSubmit = document.getElementById('u28');
var signUp = document.getElementById('u8');
var signParticipant = document.getElementById('u91');
var signHost = document.getElementById('u93');
var signFirstNameInput = document.getElementById('u50_input');
var signLastNameInput = document.getElementById('u51_input');
var signDOBMonthInput = document.getElementById('u68_input');
var signDOBDayInput = document.getElementById('u71_input');
var signDOBYearInput = document.getElementById('u72_input');
var signGenderInput = document.getElementById('u70_input');
var signUserNameInput = document.getElementById('u69_input');
var signPasswordInput = document.getElementById('u52_input');

var participant = false;
var host = false;

var config = {
  apiKey: "AIzaSyAtlo66pxNfHMxMVwL7MXNkblK1lanJgk4",
  authDomain: "project6c613.firebaseapp.com",
  databaseURL: "https://project6c613.firebaseio.com",
  projectId: "project6c613",
  storageBucket: "project6c613.appspot.com",
  messagingSenderId: "1082078319138"
};

firebase.initializeApp(config);


/**
 * The ID of the currently signed-in User. We keep track of this to detect Auth state change events that are just
 * programmatic token refresh but not a User status change.
 */
var currentUID;


/**
 * Writes the user's data to the database.
 */
// [START basic_write]
function writeParticipantData(userId, name, email, imageUrl) {
  firebase.database().ref('users/participants/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl,
    participantOrHost: "participant",
  });
}
// [END basic_write]

/**
 * Writes the user's data to the database.
 */
// [START basic_write]
function writeHostData(userId, name, email, imageUrl) {
  firebase.database().ref('users/hosts/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl,
    participantOrHost: "host",
  });
}
// [END basic_write]

/**
 * Triggers every time there is a change in the Firebase auth state (i.e. user signed-in or user signed out).
 */
function onAuthStateChanged(user) {
  // We ignore token refresh events.
  if (user && currentUID === user.uid) {
    return;
  }

  if (user) {
    currentUID = user.uid;
    //splashPage.style.display = 'none';
    if(participant){
      writeParticipantData(user.uid, user.displayName, user.email, user.photoURL);
    }
    else if(host) {
      writeHostData(user.uid, user.displayName, user.email, user.photoURL);
    }
  } else {
    // Set currentUID to null.
    currentUID = null;
    // Display the splash page where you can sign-in.
    //splashPage.style.display = '';
  }
}


function createParticipantUser(eventKey, eventName,eventCode,durationHr, durationMin)
{
    var participantData = {
        eventID: eventKey,
        name: eventName,
        code: eventCode,
        timeInHr: durationHr,
        timeInMin: durationMin,
    };

    var updates = {};
    updates['/events/' + eventKey + '/details'] = eventData;

    return firebase.database().ref().update(updates);
};

window.onload = function(){

  console.log("Home screen loaded");
  // Bind Sign in button.
  loginButton = document.getElementById('u6');
  loginButton.onclick = function(){
    console.log("Login Button Clicked");
    loginParticipant = document.getElementById('u16');
    loginHost = document.getElementById('u18');

    loginParticipant.onclick = function() {
      participant = true;
      host = false;
      console.log("participant logging in");
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    };

    loginHost.onclick = function() {
      participant = false;
      host = true;
      console.log("host");
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    };
  };

  // // Bind Sign out button.
  // signOutButton.addEventListener('click', function() {
  //   firebase.auth().signOut();
  // });

  // Listen for auth state changes
  //firebase.auth().onAuthStateChanged(onAuthStateChanged);

  // Listen for auth state changes
  firebase.auth().onAuthStateChanged(onAuthStateChanged);
}
