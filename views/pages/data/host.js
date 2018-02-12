var userProfile = document.getElementById("u255");
var events = document.getElementById("u257");
var createNewEventButton = document.getElementById("u261");
var details = document.getElementById("u262");
var badge = document.getElementById("u343");
var announcements = document.getElementById("u413");
var questions = document.getElementById("u353");
var goLive = document.getElementById("u401");
var eventName = document.getElementById("u269");
var durationHr = document.getElementById("u280");
var durationMin = document.getElementById("u285");
var eventCode = document.getElementById("u273");
var closeCreateEvent = document.getElementById("u271");
var createButton = document.getElementById("u270");
var editDetails = document.getElementById("u338");
var detailsName = document.getElementById("u392_input");
//var detailsUpload = document.getElementById("u400_input");
//var detailsUploadP = document.getElementById("u400_input");
var editBadge = document.getElementById("u344");
var announcementsText = document.getElementById("u296");
var sendAnnouncements = document.getElementById("u295");
var selectRoom = document.getElementById("u352");
var addQuestionButton = document.getElementById("u351");
var questionName = document.getElementById("u358");
var questionDescription = document.getElementById("u382");
var questionDifficultyLevel = document.getElementById("u363");
var questionRoom = document.getElementById("u359");
var saveQuestion = document.getElementById("u360");
var closeAddQuestion = document.getElementById("u361");


var config = {
  apiKey: "AIzaSyAtlo66pxNfHMxMVwL7MXNkblK1lanJgk4",
  authDomain: "project6c613.firebaseapp.com",
  databaseURL: "https://project6c613.firebaseio.com",
  projectId: "project6c613",
  storageBucket: "project6c613.appspot.com",
  messagingSenderId: "1082078319138"
};
firebase.initializeApp(config);

var rootRef = firebase.database().ref();

var database = firebase.database();

function createNewEvent(eventName,eventCode,durationHr, durationMin)
{
    var eventData = {
        eventName: "Game1",
        code: "1234",
        timeInHr: "1",
        timeInMin: "25"
    };

    database.ref("game/123456789").set({
      eventData
    });

}

createNewEventButton.onclick = function() {
  console.log("HELLOOOOO111111");
}

createButton.onclick = function() {
    console.log("HELLOOOOO");
    createNewEvent(eventName, eventCode, durationHr, durationMin);
    //store into the database firebase.database.ref()?
};
