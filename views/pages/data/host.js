var createButton, createNewEventButton, eventName, durationHr, durationMin, eventCode;
var editDetailsButton, saveEditDetailsButton;
var createBadgeButton, saveBadgeButton, badgeName, badgeImage;
var announcementButton, announcementTextArea, sendAnnouncementButton;
var createQuestionButton, addQuestionButton, editQuestionButton, questionName, questionDifficultyLevel, questionRoom;
var globalEventKey;

/*** ToDo

Need To Do!
- Be able to push more than one announcment
- Get Questions to send to database (null error keeps occuring in document.getElementById)


If Time Permits
- Remove Config Variables from sight
- Figure out images in badges

***/

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

function createBadge(eventKey, badgeName, badgeImage)
{
    var badgeData = {
        bName : badgeName,
        image : badgeImage,
    };

    var updates = {};
    updates['/events/' + eventKey + '/badges'] = badgeData;

    return firebase.database().ref().update(updates);
};

function createAnnouncement(eventKey, annoucementsText)
{
    var announcmentID = firebase.database().ref().child('announcments').push().key;
    return firebase.database().ref('events/' + eventKey + '/announcements' + announcementID).set({
        announcement:annoucementsText,
    });

    // var updates = {};
    // updates['/events/' + eventKey + '/announcements' + announcmentKey] = newAnnouncement;
    //
    // return firebase.database().ref().update(updates);
}

function createQuestion(eventKey, questionName, questionDescription, questionAnswer, questionDifficultyLevel,questionRoom)
{
    var newQuestion = {
        name : questionName,
        description: questionDescription,
        answer: question,
        level: questionDifficultyLevel,
        room: questionRoom,
    };

    var updates = {};
    updates['/events/' + eventKey + '/' + questionRoom + '/questions'] = newQuestion;

    return firebase.database().ref().update(updates);
}

window.onload = function(){
  console.log("Host View Has Loaded");
  createNewEventButton = document.getElementById('u261');
  createButton = document.getElementById("u273");

  editDetailsButton = document.getElementById('u359');
  saveEditDetailsButton = document.getElementById('u321');

  createBadgeButton = document.getElementById('u337');
  saveBadgeButton = document.getElementById('u403');

  announcementButton = document.getElementById('u265');
  sendAnnouncementButton = document.getElementById('u430');

  createQuestionButton = document.getElementById('u344');
  addQuestionButton = document.getElementById('u367');
  editQuestionButton = document.getElementById('u392');

  createNewEventButton.onclick = function() {
    console.log(createNewEventButton);
    eventName = document.getElementById("u272_input");
    eventCode = document.getElementById("u276_input");
    //Bug -- results to default 1:00
    durationHr = document.getElementById("u283_input");
    durationMin = document.getElementById("u288_input");
  }

  createButton.onclick = function() {
    createNewEvent(eventName.value,eventCode.value,durationHr.value, durationMin.value);
  };

  editDetailsButton.onclick = function() {
    eventName = document.getElementById("u320_input");
    eventCode = document.getElementById("u319_input");
    //Bug -- results to default 1:00
    durationHr = document.getElementById("u330_input");
    durationMin = document.getElementById("u335_input");
  }

  saveEditDetailsButton.onclick = function() {
    updateEvent(globalEventKey, eventName.value, eventCode.value, durationHr.value, durationMin.value);
  }

  createBadgeButton.onclick = function () {
    badgeName = document.getElementById("u404_input");
    badgeImage = "Image Holder";
  }

  saveBadgeButton.onclick = function () {
    createBadge(globalEventKey, badgeName.value, badgeImage);
  }

  announcementButton.onclick = function () {
    announcementTextArea = document.getElementById("u435_input");
  }

  sendAnnouncementButton.onclick = function () {
    createAnnouncement(globalEventKey, announcementTextArea.value);
  }

  createQuestionButton.onclick = function () {
    questionName = document.getElementById("u365_input");
    questionDescription = document.getElementById("u389_input");
    questionAnswer = document.getElementById("u395_input");
    questionDifficultyLevel = document.getElementById("u370_input");
    questionRoom = document.getElementById("u366_input");
  }

  addQuestionButton.onclick = function () {
    console.log(questionName.value);
    console.log(questionDescription.value);
    console.log(questionAnswer.value);
    console.log(questionDifficultyLevel.value);
    console.log(questionRoom.value);

    createQuestion(globalEventKey, questionName.value, questionDescription.value,questionDifficultyLevel.value,questionRoom.value)
  }

  editQuestionButton.onclick = function () {
    console.log(questionName.value);
    console.log(questionDescription.value);
    console.log(questionAnswer.value);
    console.log(questionDifficultyLevel.value);
    console.log(questionRoom.value);
  }

}
