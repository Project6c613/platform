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

function databaseQueries() {
  var myUserId = firebase.auth().currentUser.uid;
  var topParticipantsRef = firebase.database().ref('/users/participants/');

  var fetchUpdates = function(postsRef) {
    postsRef.on('child_added', function(data) {
      // console.log("Child Added");
      // console.log("Data Key " + data.key);
      // console.log("Data Username " + data.val().username);
      // console.log("Data Score " + data.val().userScore);
    });
    postsRef.on('child_changed', function(data) {
      // console.log("Child Changed");
      // console.log("Data Key " + data.key);
      // console.log("Data Username " + data.val().username);
      // console.log("Data Score " + data.val().userScore);

      javascript:(function() {
        $axure('@leaderboardrepeater').addRepeaterData([
          {
            username: {type: 'text', text: data.val().username},
            score: {type: 'text', text: data.val().userScore},
          }
        ]).refreshRepeater();
      })();
    });
    postsRef.on('child_removed', function(data) {
      // console.log("Child Removed");
    });
  }

  // Fetching and displaying all posts of each sections.
  fetchUpdates(topParticipantsRef);

  // Keep track of all Firebase refs we are listening to.
  listeningFirebaseRefs.push(topParticipantsRef);
}


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
    setTimeout(function(){ window.location.href = "index.html"; }, 2000);
  }
}

// function addToLeaderboardDatabase() {
//   user = firebase.auth().currentUser;
//   var users = firebase.database().ref('/users/participants/' + userId);
//   users.child("participants").once('value', getUserScore);
//
//     var leaderboardData = {
//       username: name,
//       userScore: score,
//     };
//   }
//
//   // Write the new post's data simultaneously in the posts list and the user's post list.
//   var updates = {};
//   updates['/leaderboard/' + user.uid] = leaderboardData;
//
//   return firebase.database().ref().update(updates);
// }


function updateLeaderboard(){
  //Leaderboard
  var users = firebase.database().ref('/users/');
  users.child("participants").once('value', getUserScore);
  function getUserScore(snapshot)
  {
    console.log(snapshot.val());
    snapshot.forEach(userSnapshot => {
       score = userSnapshot.val().userScore;
    });
    javascript:(function() {
      $axure('@leaderboardrepeater').addRepeaterData([
        {
          username: {type: 'text', text: firebase.auth().currentUser.displayName},
          score: {type: 'text', text: score.toString()},
        }
      ]).refreshRepeater();
    })();
  }
}


function updateUserScore(scoreToAdd) {
  user = firebase.auth().currentUser;
  // Increment Ada's rank by 1.
  var userScoreRef = firebase.database().ref('users/participants/' + user.uid +'/userScore' );
  userScoreRef.transaction(function(currentScore) {
    // If users/participant/uid/userScore has never been set, currentScore will be `null`.
    return currentScore + scoreToAdd;
  });
}

$(document).ready(function() {
    console.log( "Begin Ready!" );
     beginButton = document.getElementById('u448');
     beginButton.onclick = function () {
        $(document).ready(function() {
          console.log("Competition Ready!");
          profilePicture = document.getElementById('u275_img');
          profilePicture.src = firebase.auth().currentUser.photoURL;
          profileName = document.getElementById('u279');
          profileName.innerHTML = firebase.auth().currentUser.displayName;

          correctButton = document.getElementById('u401');
          correctButton.onclick = function () {
            console.log("Correct Button clicked");
           if($axure.getGlobalVariable('currentDifficulty') == "Easy"){
             console.log("5 points added");
             updateUserScore(5);
           }
             else if($axure.getGlobalVariable('currentDifficulty') == "Medium"){
              console.log("10 points added");
               updateUserScore(10);
             }
             else if($axure.getGlobalVariable('currentDifficulty') == "Hard"){
               console.log("20 points added");
               updateUserScore(20);
             }
           }
           profileButton = document.getElementById('u279');
           profileButton.onclick = function () {
             console.log("Profile Clicked");
             $(document).ready(function() {

               pictureInProfile = document.getElementById('u288_img');
               pictureInProfile.src = firebase.auth().currentUser.photoURL;
               nameInProfile = document.getElementById('u290');
               nameString = firebase.auth().currentUser.displayName;
               nameString = nameString.split(/\s(.+)/)[0];
               nameInProfile.innerHTML = nameString;

               signOutButton = document.getElementById('u302');
               signOutButton.onclick = function() {
                 firebase.auth().signOut();
               }
             });
           }
        });
     }
   firebase.auth().onAuthStateChanged(onAuthStateChanged);
});
