var createButton, createNewEventButton, eventName, durationHr, durationMin, eventCode;
var editDetailsButton, saveEditDetailsButton;
var createBadgeButton, saveBadgeButton, badgeName, badgeImage;
var announcementButton, announcementTextArea, sendAnnouncementButton;
var createQuestionButton, addQuestionButton, editQuestionButton, questionName, questionDifficultyLevel, questionRoom;
var globalEventKey
var profilePicture, profileName;

/**Notes
- If push successful

**/


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
  var newEventKey = firebase.database().ref().child('events').push().key;
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

window.onload = function(){

  console.log("Host View Has Loaded");
  //createQuestion("eventKey", "Question 7", "Question Description 7" , "How are you?", "Easy" , "Theater");
  profilePicture = document.getElementById('u249_img');
  profileName = document.getElementById('u253_div');

  createNewEventButton = document.getElementById('u259');
  createButton = document.getElementById("u271");

  editDetailsButton = document.getElementById('u357');
  saveEditDetailsButton = document.getElementById('u319');

  createBadgeButton = document.getElementById('u335');
  saveBadgeButton = document.getElementById('u401');

  announcementButton = document.getElementById('u263');
  sendAnnouncementButton = document.getElementById('u427');

  addQuestionButton = document.getElementById('u342');
  saveQuestionButton = document.getElementById('u365');
  // editSaveQuestionButton = document.getElementById('u392');

  createNewEventButton.onclick = function() {
    console.log(createNewEventButton);
    eventName = document.getElementById("u270_input");
    eventCode = document.getElementById("u274_input");
    //Bug -- results to default 1:00
    durationHr = document.getElementById("u281_input");
    durationMin = document.getElementById("u286_input");
  }

  createButton.onclick = function() {
    createNewEvent(eventName.value,eventCode.value,durationHr.value, durationMin.value);
  };

  editDetailsButton.onclick = function() {
    eventName = document.getElementById("u318_input");
    eventCode = document.getElementById("u328_input");
    //Bug -- results to default 1:00
    durationHr = document.getElementById("u333_input");
    durationMin = document.getElementById("u317_input");
  }

  saveEditDetailsButton.onclick = function() {
    updateEvent(globalEventKey, eventName.value, eventCode.value, durationHr.value, durationMin.value);
  }

  createBadgeButton.onclick = function () {
    badgeName = document.getElementById("u402_input");
    badgeImage = document.getElementById("u409_input");
  }

  saveBadgeButton.onclick = function () {
    createBadge(globalEventKey, badgeName.value, badgeImage.value);
  }

  announcementButton.onclick = function () {
    announcementTextArea = document.getElementById("u432_input");
  }

  sendAnnouncementButton.onclick = function () {
    createAnnouncement(globalEventKey, announcementTextArea.value);
  }

  addQuestionButton.onclick = function () {
    questionName = document.getElementById("u363_input");
    questionDescription = document.getElementById("u387_input");
    questionAnswer = document.getElementById("u393_input");
    questionDifficultyLevel = document.getElementById("u368_input");
    questionRoom = document.getElementById("u364_input");
  }

  saveQuestionButton.onclick = function () {
    console.log(questionName.value);
    console.log(questionDescription.value);
    console.log(questionAnswer.value);
    console.log(questionDifficultyLevel.value);
    console.log(questionRoom.value);


  //  createQuestion(globalEventKey, questionName.value, questionDescription.value , questionAnswer.value , questionDifficultyLevel.value , questionRoom.value)
    editQuestionButton.onclick = function () {
      console.log(questionName.value);
      console.log(questionDescription.value);
      console.log(questionAnswer.value);
      console.log(questionDifficultyLevel.value);
      console.log(questionRoom.value);
    }

  }



}
