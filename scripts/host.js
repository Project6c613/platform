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
var editBadge = document.getElementById("u344");
var announcementsText = document.getElementById("u296");
var sendAnnouncements = document.getElementById("u295");
var selectRoom = document.getElementById("u352");
var addQuestionButton =  = document.getElementById("u351");
var questionName = document.getElementById("u358");
var questionDescription = document.getElementById("u382");
var questionDifficultyLevel = document.getElementById("u363");
var questionRoom = document.getElementById("u359");
var saveQuestion = document.getElementById("u360");
var closeAddQuestion = document.getElementById("u361");



function createNewEvent(eventName,eventCode,durationHr, durationMin) 
{
    var eventData = {
        author: eventName,
        code: eventCode,
        timeInHr: durationHr,
        timeInMin: durationMin; 
    };
       
}

createButton.onclick = function() {
    var events = ref.child("eventCode");
    createNewEvent(eventName, eventCode, durationHr, durationMin);
    //store into the database firebase.database.ref()?
};
function createBadge(badgeName, badgeImage)
{
    var badgeData = {
        bName : badgeName,
        image : badgeImage;
    }

};
editBadge.onclick = function(){
    createBadge(badgeName, badgeImage);
};

function announcements(annoucementsText)
{
    var newAnnouncement = {
        announcement:annoucementsText;
    };
}

sendAnnouncements.onclick = function(){
    annoucements(annoucementsText);
};




function addQuestion(questionName, questionDescription,questionDifficultyLevel,questionRoom)
{
    var newQuestion = {
        name : questionName,
        description: questionDescription,
        level: questionDifficultyLevel,
        room: questionRoom;
    };
    
}

saveQuestion.onclick = function(){
var question = ref.child("question");
addQuestion(questionName, questionDescription,questionDifficultyLevel,questionRoom);
};

goLive.onclick = function() {
    //store in the database and somehow send info to the player side to have the plaer's page change from waiting //screen to the game screen
};

