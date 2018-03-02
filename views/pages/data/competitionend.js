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
    console.log(currentUID);
  } else {
    // Set currentUID to null.
    currentUID = null;
    setTimeout(function(){ window.location.href = "index.html"; }, 2000);
  }
}

window.onload = function() {

  var eventId = firebase.database().ref('/events/FacebookEvent/');
  eventId.child("leaderboard").once('value', getLeaderboardData);
  function getLeaderboardData(snapshot)
  {
    console.log(snapshot.val());
    snapshot.forEach(userSnapshot => {
      javascript:(function() {
        $axure('@finalleaderboardrepeater').addRepeaterData([
          {
            username: {type: 'text', text: userSnapshot.val().participant},
            score: {type: 'text', text: userSnapshot.val().participantScore},
          }
        ]).refreshRepeater();
      })();
    });
  }

  signOutButton = document.getElementById('u452');
  signOutButton.onclick = function() {
    firebase.auth().signOut();
  }
firebase.auth().onAuthStateChanged(onAuthStateChanged);
}
