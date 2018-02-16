/*
	Theater - u158
	Arcade - u165
	Library - u168
	Bedroom - u173
	Living Room - u178
	Foyer - u183
	Kitchen - u188
	Dining Room - u193
	User Profile Button - u110
*/


var config = {
  apiKey: "AIzaSyAtlo66pxNfHMxMVwL7MXNkblK1lanJgk4",
  authDomain: "project6c613.firebaseapp.com",
  databaseURL: "https://project6c613.firebaseio.com",
  projectId: "project6c613",
  storageBucket: "project6c613.appspot.com",
  messagingSenderId: "1082078319138"
};

firebase.initializeApp(config);

var theaterRoom = document.getElementById('u158');
var arcadeRoom = document.getElementById('u165');
var libraryRoom = document.getElementById('u168');
var bedroomRoom = document.getElementById('u173');
var livingRoom = document.getElementById('u178');
var foyerRoom = document.getElementById('u183');
var kitchenRoom = document.getElementById('u188');
var diningRoom = document.getElementById('u193');
var userProfile = document.getElementById('u110');
var submitAnswerInput = document.getElementById('u225_input');
var submitButton = document.getElementById('u226');

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


window.onload = function(){

  theaterRoom = document.getElementById('u156');
  console.log("Player View Has Loaded");
  theaterRoom.onclick = function()
  {
    var question = firebase.database().ref('/question/');
    var questionId = firebase.database().ref('/events/eventKey/Bedroom/questions/');
    questionId.child("questions").once('value', getQuestionData);
    console.log(questionId.values)
    function getQuestionData(snapshot)
    {
      snapshot.forEach(userSnapshot => {
        var k = userSnapshot.key;
        var id = userSnapshot.val().answer;
        var description = userSnapshot.val().description;
        console.log(description.value)
        console.log(id.value)
      });
    }
    /* questionId.on('value', function(snapshot){
      console.log(snapshot.val());
      console.log(snapshot.val().answer);
    //  console.log(questionId.value);
  });*/
  	//load questions for theater room
  	//id - u204_state0 will get filled with the theater questions

  }
}

/*
arcadeRoom.onclick = function()
{
	//load questions for theater room
	//id - u204_state0 will get filled with the theater questio
  ns
}

libraryRoom.onclick = function()
{
	//load questions for theater room
	//id - u204_state0 will get filled with the theater questions

}
bedroomRoom.onclick = function()
{
	//load questions for theater room
	//id - u204_state0 will get filled with the theater questions
}

livingRoom.onclick = function()
{
	//load questions for theater room
	//id - u204_state0 will get filled with the theater questions

}

foyerRoom.onclick = function()
{
	//load questions for theater room
	//id - u204_state0 will get filled with the theater questions
}

kitchenRoom.onclick = function()
{
	//load questions for theater room
	//id - u204_state0 will get filled with the theater questions

}

diningRoom.onclick = function()
{
	//load questions for theater room
	//id - u204_state0 will get filled with the theater questions
}

userProfile.onclick = function()
{
	//fill user info

}*/
