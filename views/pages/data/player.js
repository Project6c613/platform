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
/*javascript:(function() {
  $axure('@questionsrepeater').addRepeaterData([
    {
      Name: {type: 'text', text: 'World'},
      isSolved: {type: 'text', text: 'false'}
    }
  ]).refreshRepeater();
})();*/

window.onload = function(){

  var announcementsText = document.getElementById('u138_input');
  console.log("Announcements is loading");

  //will need to get actual event key here
  var announcmentsRef = firebase.database().ref('/events/eventKey/announcements/');
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


  theaterRoom = document.getElementById('u168');
  console.log("Player View Has Loaded");
  theaterRoom.onclick = function()
  {
    var question = firebase.database().ref('/question/');
    var questionId = firebase.database().ref('/events/eventKey/Theater/');
    console.log("hihi" + questionId.child("questions"));
    questionId.child("questions").once('value', getQuestionData);
    function getQuestionData(snapshot)
    {
      console.log(snapshot.val());
      snapshot.forEach(userSnapshot => {
        var id = userSnapshot.val().answer;
        var description = userSnapshot.val().description;
        console.log(id + "poop" + description);

        var count = userSnapshot.val().numQuestion;
        console.log(count);
        var numAnswered = 0;
    //    announcmentsText.value += data.val().announcement;
        $axure('[data-label="key progress theater room"]').css({'font-family': 'Komika Text'});
        $axure('[data-label="key progress theater room"]').css({'color': 'white'});
        $axure('[data-label="key progress theater room"]').css({'font-size': '16px'});
        $('[data-label="key progress theater room"]').html(numAnswered + "/" + count);
        //check and make sure it's not appending questions multiple times
        $axure('@theaterquestionsrepeater').addRepeaterData([
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
