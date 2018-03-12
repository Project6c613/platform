var theaterRoom = document.getElementById('u168');
var arcadeRoom = document.getElementById('u165');
var libraryRoom = document.getElementById('u168');
var bedroomRoom = document.getElementById('u173');
var livingRoom = document.getElementById('u178');
var foyerRoom = document.getElementById('u183');
var kitchenRoom = document.getElementById('u188');
var diningRoom = document.getElementById('u193');
var userProfile = document.getElementById('u110');
var submitAnswerInput = document.getElementById('u225_input');
var submitButton = document.getElementById('u243');
var userAnswer;
var currentUID;
var scoreBoard;
var score = 0;

var user, profilePicture, profileName, profileButton, pictureInProfile, nameInProfile;
var correctButton;
var signOutButton;
var currentUID;
var nameString;

var addedQuestionsTheaterRoom = false;
var addedQuestionsDiningRoom = false;
var addedQuestionsKitchen = false;
var addedQuestionsLibrary = false;
var addedQuestionsArcade = false;
var addedQuestionsLivingRoom = false;
var addedQuestionsFoyer = false;
var addedQuestionsBedroom = false;


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
    addUserToLeaderboard();
    console.log(currentUID);
  } else {
    // Set currentUID to null.
    currentUID = null;
    alert("Please Close The Session and Re-Login");
    setTimeout(function(){ window.location.href = "index.html"; }, 2000);
  }
}


function updateUserScore(scoreToAdd) {
  user = firebase.auth().currentUser;
  // Increment Ada's rank by 1.
  var userScoreRef = firebase.database().ref('events/FacebookEvent/leaderboard/' + user.uid + '/participantScore' );
  userScoreRef.transaction(function(currentScore) {
    // If users/participant/uid/userScore has never been set, currentScore will be `null`.
    return currentScore + scoreToAdd;
  });
}

function updateScoreboard(scoreboard){
  //Leaderboard
  var users = firebase.database().ref('events/FacebookEvent/leaderboard/' + user.uid);
  users.once('value', getUserScore);
  function getUserScore(snapshot)
  {
    console.log(snapshot.val());
    score = snapshot.val().participantScore;
    console.log("Score: " + score);
    scoreboard.innerHTML = score;
  }
}

function addUserToLeaderboard()
{
    console.log("Adding User");
    var user = firebase.auth().currentUser;
    return firebase.database().ref('/events/FacebookEvent/leaderboard/' + user.uid).set({
        participant: user.displayName,
        participantScore: 0,
    });
}


//keep track of total number of keys
/*
submitButton.onclick = function(room, question, submitAnswerInput)
{
	//database data = new database;
	//var answer = data.room.question.answer;
	/*
	if(answer == submitAnswerInput)
	{
		//show congrats page
		//disable question
		//subtract key number
	}
	else
	{
		//show wrong answer function
	}
}*/

function addQuestionsToRoom(roomRef, roomRepeaterName){
  roomRef.child("questions").once('value', getQuestionData);
  function getQuestionData(snapshot)
  {
    console.log(snapshot.val());
    snapshot.forEach(userSnapshot => {
      // var count = snapshot.val().numQuestion;
      // console.log("Number of Questions" + count);
      // var numAnswered = 0;
      // $axure('[data-label="key progress theater room"]').css({'font-family': 'Komika Text'});
      // $axure('[data-label="key progress theater room"]').css({'color': 'white'});
      // $axure('[data-label="key progress theater room"]').css({'font-size': '16px'});
      // $('[data-label="key progress theater room"]').html(numAnswered + "/" + count);
      //check and make sure it's not appending questions multiple times
        $axure(roomRepeaterName).addRepeaterData([
          {
            name: {type: 'text', text: userSnapshot.val().name},
            isSolved: {type: 'text', text: 'false'},
            description: {type: 'text', text: userSnapshot.val().description},
            difficulty: {type: 'text', text: userSnapshot.val().level},
            answer: {type: 'text', text: userSnapshot.val().answer},
            room: {type: 'text', text: userSnapshot.val().room},
          }
        ]).refreshRepeater();
    });
  }
}

window.onload = function(){

  profilePicture = document.getElementById('u144_img');
  profilePicture.src = firebase.auth().currentUser.photoURL;
  profileName = document.getElementById('u148');
  nameString = firebase.auth().currentUser.displayName;
  nameString = nameString.split(/\s(.+)/)[0];
  profileName.innerHTML = nameString;

  var announcementsText = document.getElementById('u151_input');
  console.log("Announcements is loading");

  //will need to get actual event key here
  var announcmentsRef = firebase.database().ref('/events/FacebookEvent/announcements/').limitToLast(5);
  announcmentsRef.on('child_added', function(data)
  {
    console.log("Child Added");
    console.log("Data Key " + data.key);
    console.log("Data Actual Name " + data.val().announcement);
    console.log("Data ID " + data.val().announcementID);
    var announce = data.val().announcement;
    console.log(announce);
//    announcmentsText.value += data.val().announcement;
    $axure('@announcements').css({'font-family': 'Komika Text'});
    $axure('@announcements').css({'color': 'white'});
    $axure('@announcements').css({'font-size': '16px'});
    $('[data-label="announcements"]').append("<li>" + announce + "</li>");
  });

  announcmentsRef.on('child_changed', function(data)
  {
    console.log("Child Added");
    console.log("Data Key " + data.key);
    console.log("Data Actual Name " + data.val().annoucement);
    console.log("Data ID " + data.val().announcementID);
  });

  console.log("Player View Has Loaded");

  theaterRoom = document.getElementById('u181');
//  theaterRoom.onclick = function()
//  {
    var theaterRef = firebase.database().ref('/events/FacebookEvent/Theater/');
    if(addedQuestionsTheaterRoom == false){
//      alert("Theater Questions are loading");
      addQuestionsToRoom(theaterRef,'@theaterquestionsrepeater');
      addedQuestionsTheaterRoom = true;
    }
//  }

  diningRoom = document.getElementById('u230');
//  diningRoom.onclick = function()
//  {
    var diningRef = firebase.database().ref('/events/FacebookEvent/Dining Room/');
    if(addedQuestionsDiningRoom == false){
//      alert("Dining Room Questions are loading");
      addQuestionsToRoom(diningRef,'@diningroomquestionsrepeater');
      addedQuestionsDiningRoom = true;
    }
//  }

  kitchenRoom = document.getElementById('u223');
//  kitchenRoom.onclick = function()
//  {
    var kitchenRef = firebase.database().ref('/events/FacebookEvent/Kitchen/');
    if(addedQuestionsKitchen == false){
//      alert("Kitchen Questions are loading");
      addQuestionsToRoom(kitchenRef,'@kitchenquestionsrepeater');
      addedQuestionsKitchen = true;
    }
//  }

  libraryRoom = document.getElementById('u195');
//  libraryRoom.onclick = function()
//  {
    var libraryRef = firebase.database().ref('/events/FacebookEvent/Library/');
    if(addedQuestionsLibrary == false){
//      alert("Library room Questions are loading");
      addQuestionsToRoom(libraryRef,'@libraryquestionsrepeater');
      addedQuestionsLibrary = true;
    }
//  }

  arcadeRoom = document.getElementById('u188');
//  arcadeRoom.onclick = function()
//  {
    var arcadeRef = firebase.database().ref('/events/FacebookEvent/Arcade/');
    if(addedQuestionsArcade == false){
//      alert("Arcade Questions are loading");
      addQuestionsToRoom(arcadeRef,'@arcadequestionsrepeater');
      addedQuestionsArcade = true;
    }
//  }

  bedRoom = document.getElementById('u202');
//  bedRoom.onclick = function()
//  {
    var bedroomRef = firebase.database().ref('/events/FacebookEvent/Bedroom/');
    if(addedQuestionsBedroom == false){
//      alert("Bedroom Questions are loading");
      addQuestionsToRoom(bedroomRef,'@bedroomquestionsrepeater');
      addedQuestionsBedroom = true;
    }
//  }

  livingRoom = document.getElementById('u209');
//  livingRoom.onclick = function()
//  {
    var livingRef = firebase.database().ref('/events/FacebookEvent/Living Room/');
    if(addedQuestionsLivingRoom == false){
//      alert("Living Room Questions are loading");
      addQuestionsToRoom(livingRef,'@livingroomquestionsrepeater');
      addedQuestionsLivingRoom = true;
    }
//  }

  foyerRoom = document.getElementById('u216');
//  foyerRoom.onclick = function()
//  {
    var foyerRef = firebase.database().ref('/events/FacebookEvent/Foyer/');
    if(addedQuestionsFoyer == false){
//      alert("Foyer Questions are loading");
      addQuestionsToRoom(foyerRef,'@foyerquestionsrepeater');
      addedQuestionsFoyer = true;
    }
//  }

  scoreBoard = document.getElementById('u433');
  correctButton = document.getElementById('u270');
  correctButton.onclick = function () {
    console.log("Correct Button clicked");
   if($axure.getGlobalVariable('currentDifficulty') == "Easy"){
     console.log("5 points added");
     updateUserScore(5);
     updateScoreboard(scoreBoard);
   }
     else if($axure.getGlobalVariable('currentDifficulty') == "Medium"){
      console.log("10 points added");
       updateUserScore(10);
       updateScoreboard(scoreBoard);
     }
     else if($axure.getGlobalVariable('currentDifficulty') == "Hard"){
       console.log("20 points added");
       updateUserScore(20);
       updateScoreboard(scoreBoard);
     }
   }

   profileButton = document.getElementById('u135');
   profileButton.onclick = function () {
     console.log("Profile Clicked");
     $(document).ready(function() {

       pictureInProfile = document.getElementById('u157_img');
       pictureInProfile.src = firebase.auth().currentUser.photoURL;
       nameInProfile = document.getElementById('u159');
       nameString = firebase.auth().currentUser.displayName;
       nameString = nameString.split(/\s(.+)/)[0];
       nameInProfile.innerHTML = nameString;

       signOutButton = document.getElementById('u158');
       signOutButton.onclick = function() {
         firebase.auth().signOut();
       }
     });
   }


   firebase.auth().onAuthStateChanged(onAuthStateChanged);
}
