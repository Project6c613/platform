var user, profilePicture, profileName;
var beginButton, correctButton;
var oldScore, newScore;

var config = {
  apiKey: "AIzaSyAtlo66pxNfHMxMVwL7MXNkblK1lanJgk4",
  authDomain: "project6c613.firebaseapp.com",
  databaseURL: "https://project6c613.firebaseio.com",
  projectId: "project6c613",
  storageBucket: "project6c613.appspot.com",
  messagingSenderId: "1082078319138"
};

firebase.initializeApp(config);

function writeParticipantData(userId, name, email, imageUrl) {
  firebase.database().ref('users/participants/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl,
    participantOrHost: "participant",
    userScore: 0,
  });
}

// function onAuthStateChanged(user) {
//
//   if (user) {
//     currentUID = user.uid;
//     console.log(user.displayName);
//
//   } else {
//     // Set currentUID to null.
//     currentUID = null;
//     // Display the splash page where you can sign-in.
//     //splashPage.style.display = '';
//   }
// }

// $axure('@leaderboardrepeater').refreshRepeater();
//
// $axure('@leaderboardrepeater').updateRepeaterData('marked', {
//   score: {type: 'text', text: '12'}
// })
//
// javascript:(function() {
//   $axure('@leaderboardrepeater').addRepeaterData([
//     {
//       username: {type: 'text', text: firebase.auth().currentUser.displayName},
//       score: {type: 'text', text: score.toString()},
//     }
//   ]).refreshRepeater();
// })();
//
// javascript:(function() { $axure('@leaderboardrepeater').refreshRepeater(); }
//
// function addToLeaderboard() {
// javascript:(function() {
//   $axure('@leaderboardrepeater').updateRepeaterData(([
//     {
//         score: {type: 'text', text: '12'}
//     }
//
//   ]).refreshRepeater();
// });
// }
//
// javascript:(function() {
//   // Update rows in repater Target
//   var target = $axure('@Target');
//   var rows = $axure('@Target').getRepeaterRows();
//   if (rows.length > 1) {
//     var row = {name: {type: 'text', text: 'Edited...'}};
//     target.updateRepeaterData([rows[0], rows[1]], row).refreshRepeater();
//   }
// })();

// $axure('@widget').updateRepeaterData('marked', {
//   valueName: {type: 'text', text: 'Hello World'}
// });

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

function updateUserScore(userscore)
{

  var users = firebase.database().ref('/users/');
  oldScore, newScore = 0;
  console.log("Participant Data: " + users.child("participants"));
  users.child("participants").once('value', getUserScore);

  function getUserScore(snapshot)
  {
    console.log(snapshot.val());
    snapshot.forEach(userSnapshot => {
       oldScore = userSnapshot.val().userScore;
    });

  newScore = (oldScore + userscore);
    var userData = {
      username: user.displayName,
      email: user.email,
      profile_picture : user.photoURL,
      participantOrHost: "host",
      userScore: newScore,
    };

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['users/participants/' + user.uid] = userData;

    return firebase.database().ref().update(updates);

    }
};

$(document).ready(function() {
    console.log( "Begin Ready!" );
    user = firebase.auth().currentUser;
    writeParticipantData(user.uid, user.displayName, user.email, user.photoURL);
     beginButton = document.getElementById('u447');
     beginButton.onclick = function () {
        user = firebase.auth().currentUser;
        $(document).ready(function() {
          console.log("Competition Ready!");
           profilePicture = document.getElementById('u275_img');
           profilePicture.src = user.photoURL;
           profileName = document.getElementById('u279');
           profileName.innerHTML = user.displayName;

           correctButton = document.getElementById('u400');
           correctButton.onclick = function () {
             if($axure.getGlobalVariable('currentDifficulty') == "Easy"){
               console.log("5 points added");
               updateUserScore(5);
               updateLeaderboard();
             }
             else if($axure.getGlobalVariable('currentDifficulty') == "Medium"){
              console.log("10 points added");
               updateUserScore(10);
               updateLeaderboard();
             }
             else if($axure.getGlobalVariable('currentDifficulty') == "Hard"){
               console.log("20 points added");
               updateUserScore(20);
               updateLeaderboard();
             }
           }
        });

     }
    // firebase.auth().onAuthStateChanged(onAuthStateChanged);
});
