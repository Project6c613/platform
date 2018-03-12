var createButton, createNewEventButton, eventName, durationHr, durationMin, eventCode;
var editDetailsButton, saveEditDetailsButton;
var createBadgeButton, saveBadgeButton, badgeName, badgeImage;
var announcementButton, announcementTextArea, sendAnnouncementButton;
var createQuestionButton, addQuestionButton, editQuestionButton, questionName, questionDifficultyLevel, questionRoom;
var globalEventKey
var profilePicture, profileName;
var savedHr, savedMin, savedAnnouncment, savedDescription, savedLevel, savedName, savedRoom;
var goLive;

goLive = "false";
/**Notes
- If push successful

**/

// javascript:(function() {
//   $axure('@eventsrepeater').addRepeaterData([
//     {
//       name: {type: 'text', text: 'World'},
//       code: {type: 'text', text: 'Low'}
//     }
//   ]).refreshRepeater();
// })();
var config = {
  apiKey: "AIzaSyAtlo66pxNfHMxMVwL7MXNkblK1lanJgk4",
  authDomain: "project6c613.firebaseapp.com",
  databaseURL: "https://project6c613.firebaseio.com",
  projectId: "project6c613",
  storageBucket: "project6c613.appspot.com",
  messagingSenderId: "1082078319138"
};

firebase.initializeApp(config);

function createNewEvent(eventName,eventCode,durationHr, durationMin)
{
  var newEventKey = "FacebookEvent";
  globalEventKey = newEventKey;

    var eventData = {
        eventID: newEventKey,
        name: eventName,
        code: eventCode,
        timeInHr: durationHr,
        timeInMin: durationMin,
    };

    // Get a key for a new Post.

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/events/' + newEventKey + '/details'] = eventData;

    return firebase.database().ref().update(updates);
};

function updateEvent(eventKey, eventName,eventCode,durationHr, durationMin)
{
    var eventData = {
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

function createBadge(eventKey, badgeName, badgeImageUrl)
{
    var badgeData = {
        bName : badgeName,
        image : badgeImageUrl,
    };

    var updates = {};
    updates['/events/' + eventKey + '/badges'] = badgeData;

    return firebase.database().ref().update(updates);
};

function createAnnouncement(eventKey, annoucementsText)
{
    var announcementID = firebase.database().ref().child('announcments').push().key;
    return firebase.database().ref('/events/' + eventKey + '/announcements/' + announcementID).set({
        announcmentID: announcementID,
        announcement:annoucementsText,
    });

    // var updates = {};
    // updates['/events/' + eventKey + '/announcements' + announcmentKey] = newAnnouncement;
    //
    // return firebase.database().ref().update(updates);
}

function createQuestion(eventKey, questionName, questionDescription, questionAnswer, questionDifficultyLevel,questionRoom)
{
    var questionID = firebase.database().ref().child('questions').push().key;

    var newQuestion = {
        id: questionID,
        name : questionName,
        description: questionDescription,
        answer: questionAnswer,
        level: questionDifficultyLevel,
        room: questionRoom,
    };

    var updates = {};
    updates['/events/' + eventKey + '/' + questionRoom + '/questions/' + questionID] = newQuestion;

    return firebase.database().ref().update(updates);
}

// function goLiveNow(eventKey, goLive)
// {
// 	var startLive =
// 	{
// 		islive: goLive,
// 	};
//
// 	var updates = {};
// 	updates['/events/' + eventKey + '/live'] = startLive;
// 	return firebase.database().ref().update(updates);
// }

function goLiveNow(eventKey, goLive) {
  // Increment Ada's rank by 1.
  var eventLiveRef = firebase.database().ref('events/' + eventKey + '/live' );
  eventLiveRef.transaction(function(currentValue) {
    // If users/participant/uid/userScore has never been set, currentScore will be `null`.
    return goLive
  });
}

window.onload = function(){

  console.log("Host View Has Loaded");

  profilePicture = document.getElementById('u470_img');
  profilePicture.src = firebase.auth().currentUser.photoURL;
  profileName = document.getElementById('u475');
  profileName.innerHTML = "";
 nameString = firebase.auth().currentUser.displayName;
 nameString = nameString.split(/\s(.+)/)[0];
 profileName.innerHTML = nameString;


  createNewEventButton = document.getElementById('u480');
  createButton = document.getElementById("u493");

  editDetailsButton = document.getElementById('u580');
  saveEditDetailsButton = document.getElementById('u542');

  createBadgeButton = document.getElementById('u558');
  saveBadgeButton = document.getElementById('u624');

  announcementButton = document.getElementById('u484');
  sendAnnouncementButton = document.getElementById('u651');

  addQuestionButton = document.getElementById('u565');
  saveQuestionButton = document.getElementById('u588');
  // editSaveQuestionButton = document.getElementById('u392');

  goLiveButton = document.getElementById('u633');

  createNewEventButton.onclick = function() {
    console.log(createNewEventButton);
    eventName = document.getElementById("u492_input");
    eventCode = document.getElementById("u496_input");
    //Bug -- results to default 1:00
    durationHr = document.getElementById("u503_input");
    durationMin = document.getElementById("u508_input");

    durationHr.onchange = function(){savedHr = durationHr.value};
    durationMin.onchange = function(){savedMin = durationMin.value};

  }

  createButton.onclick = function() {
  	if(eventName.value != "" && eventCode.value != "" && savedHr != " "  && savedMin != " ")
  	{
    	createNewEvent(eventName.value,eventCode.value,savedHr, savedMin);
    	goLiveNow(globalEventKey, goLive);
    }
  };

  editDetailsButton.onclick = function() {
    eventName = document.getElementById("u541_input");
    eventCode = document.getElementById("u540_input");
    //Bug -- results to default 1:00
    durationHr = document.getElementById("u551_input");
    durationMin = document.getElementById("u556_input");
  }

  saveEditDetailsButton.onclick = function() {
    updateEvent(globalEventKey, eventName.value, eventCode.value, durationHr.value, durationMin.value);
  }

  createBadgeButton.onclick = function () {
    badgeName = document.getElementById("u625_input");
    badgeImage = document.getElementById("u632_input");
  }

  saveBadgeButton.onclick = function () {
    createBadge(globalEventKey, badgeName.value, badgeImage.value);
  }

  announcementButton.onclick = function () {
    announcementTextArea = document.getElementById("u656_input");
    announcementTextArea.onchange = function(){savedAnnouncment = announcementTextArea.value};
  }

  sendAnnouncementButton.onclick = function () {
    createAnnouncement(globalEventKey, savedAnnouncment);
  }

  addQuestionButton.onclick = function () {
    questionName = document.getElementById("u586_input");
    questionDescription = document.getElementById("u610_input");
    questionAnswer = document.getElementById("u616_input");
    questionDifficultyLevel = document.getElementById("u591_input");
    questionRoom = document.getElementById("u587_input");

    questionName.onchange = function(){savedName = questionName.value};
    questionDescription.onchange = function(){savedDescription = questionDescription.value};
    questionDifficultyLevel.onchange = function(){savedLevel = questionDifficultyLevel.value};
    questionRoom.onchange = function(){savedRoom = questionRoom.value};
  }

  saveQuestionButton.onclick = function () {
    console.log(questionName.value);
    console.log(questionDescription.value);
    console.log(questionAnswer.value);
    console.log(questionDifficultyLevel.value);
    console.log(questionRoom.value);


    createQuestion(globalEventKey, savedName, savedDescription , questionAnswer.value , savedLevel, savedRoom)
    /*editQuestionButton.onclick = function () {
      console.log(questionName.value);
      console.log(questionDescription.value);
      console.log(questionAnswer.value);
      console.log(questionDifficultyLevel.value);
      console.log(questionRoom.value);
    }*/

  }

  goLiveButton.onclick = function () {
  	goLive = "true";
  	goLiveNow(globalEventKey, goLive);
  }





}
