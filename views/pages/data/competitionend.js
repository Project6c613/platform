var config = {
  apiKey: "AIzaSyAtlo66pxNfHMxMVwL7MXNkblK1lanJgk4",
  authDomain: "project6c613.firebaseapp.com",
  databaseURL: "https://project6c613.firebaseio.com",
  projectId: "project6c613",
  storageBucket: "project6c613.appspot.com",
  messagingSenderId: "1082078319138"
};

firebase.initializeApp(config);

window.onload = function() {


  // var myUserId = firebase.auth().currentUser.uid;
  // var participants = firebase.database().ref('/users/participants/');
  //
  // var fetchUpdates = function(postsRef) {
  //     postsRef.once('value', function(data) {
  //       console.log(data.val().username);
  //       console.log(data.val().score);
  //     });
  // }
  //
  // fetchUpdates(participants);


  // var question = firebase.database().ref('/question/');
  // var questionId = firebase.database().ref('/users/participants/');
  // console.log("hihi" + questionId.child("questions"));
  // questionId.child("questions").once('value', getQuestionData);
  // function getQuestionData(snapshot)
  // {
  //   console.log(snapshot.val());
  //   snapshot.forEach(userSnapshot => {
  //     var id = userSnapshot.val().answer;
  //     var description = userSnapshot.val().description;
  //     javascript:(function() {
  //       $axure('@finalleaderboardrepeater').addRepeaterData([
  //         {
  //           username: {type: 'text', text: data.val().username},
  //           score: {type: 'text', text: data.val().userScore},
  //         }
  //       ]).refreshRepeater();
  //     })();
  //   });
  // }

}
