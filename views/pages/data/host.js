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

    var updates = {};
    updates['/events/' + eventKey + '/announcements' + announcmentKey] = newAnnouncement;

    return firebase.database().ref().update(updates);
}

function createQuestion(eventKey, questionName, questionDescription, questionAnswer, questionFeedback, questionDifficultyLevel,questionRoom)
{
    var questionID = firebase.database().ref().child('questions').push().key;

    var newQuestion = {
        id: questionID,
        name : questionName,
        description: questionDescription,
        answer: questionAnswer,
        feedback: questionFeedback,
        level: questionDifficultyLevel,
        room: questionRoom,
        isSolved: false,
    };

    var updates = {};
    updates['events/' + eventKey + '/' + questionRoom + '/questions/' + questionID] = newQuestion;

    return firebase.database().ref().update(updates);
}

window.onload = function(){

  console.log("Host View Has Loaded");
  createNewEvent("Event: Testing Database","Event Code","1", "00");
  createBadge("newEventKey", "badgeName", "badgeImageUrl");
  createAnnouncement("newEventKey", "annoucementsText");
  createQuestion("newEventKey", "questionName", "questionDescription", "questionAnswer", "questionFeedback", "questionDifficultyLevel","questionRoom");


  profilePicture = document.getElementById('u598_img');
  profileName = document.getElementById('u602_div');

  createNewEventButton = document.getElementById('u608');
  createButton = document.getElementById("u620");

  editDetailsButton = document.getElementById('u707');
  saveEditDetailsButton = document.getElementById('u669');

  createBadgeButton = document.getElementById('u685');
  saveBadgeButton = document.getElementById('u751');

  announcementButton = document.getElementById('u612');
  sendAnnouncementButton = document.getElementById('u777');

  addQuestionButton = document.getElementById('u692');
  saveQuestionButton = document.getElementById('u715');
  // editSaveQuestionButton = document.getElementById('u392');

  createNewEventButton.onclick = function() {
    console.log(createNewEventButton);
    eventName = document.getElementById("u619_input");
    eventCode = document.getElementById("u623_input");
    //Bug -- results to default 1:00
    durationHr = document.getElementById("u630_input");
    durationMin = document.getElementById("u635_input");

    createButton.onsubmit = function() {
      console.log(eventName);
      console.log(eventCode);
      console.log(durationHr);
      console.log(durationMin);
      console.log("submitting event");
      createNewEvent(eventName.value,eventCode.value,durationHr.value, durationMin.value);
    };
  }

  editDetailsButton.onclick = function() {
    eventName = document.getElementById("u668_input");
    eventCode = document.getElementById("u667_input");
    //Bug -- results to default 1:00
    durationHr = document.getElementById("u678_input");
    durationMin = document.getElementById("u683_input");
  }

  saveEditDetailsButton.onclick = function() {
    updateEvent(globalEventKey, eventName.value, eventCode.value, durationHr.value, durationMin.value);
  }

  createBadgeButton.onclick = function () {
    badgeName = document.getElementById("u752_input");
    badgeImage = document.getElementById("u759_input");
  }

  saveBadgeButton.onclick = function () {
    createBadge(globalEventKey, badgeName.value, badgeImage.value);
  }

  announcementButton.onclick = function () {
    announcementTextArea = document.getElementById("u782_input");
  }

  sendAnnouncementButton.onclick = function () {
    createAnnouncement(globalEventKey, announcementTextArea.value);
  }

  addQuestionButton.onclick = function () {
    questionName = document.getElementById("u713_input");
    questionDescription = document.getElementById("u737_input");
    questionAnswer = document.getElementById("u743_input");
    questionDifficultyLevel = document.getElementById("u718_input");
    questionRoom = document.getElementById("u714_input");
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
