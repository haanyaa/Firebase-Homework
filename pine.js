// Initialize Fire

var config = {
    apiKey: "AIzaSyAJ7G63K4pZdlgYoGxavBt18QZ13zQrYHg",
    authDomain: "fir-project-bf253.firebaseapp.com",
    databaseURL: "https://fir-project-bf253.firebaseio.com",
    projectId: "fir-project-bf253",
    storageBucket: "fir-project-bf253.appspot.com",
    messagingSenderId: "495593446579"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Intial values

  var trainName ="";
  var destination = "";
  var firstTrainUnix = 0;
  var frequency = 0;

// Populate Firebase Database with initial data 
  $("#submit").on("click",function(event){
      event.preventDefault();

      var trainName = $("#train-name").val().trim();
      var destination = $("#destination").val().trim();
      var firstTrainUnix = $("#traintime").val().trim();
      var frequency = $("#frequency").val().trim();


      // Creating local "temporary object for holding train data"



      var json = {

          trainName:trainName,
          destination:destination,
          firstTrainUnix : firstTrainUnix,
          frequency : frequency

      };
      // upload train data to the database.

      database.ref("/times").push(json);

      // log everything to the console

  console.log(json.trainName);
	console.log(json.destination); 
	console.log(firstTrainUnix);
	console.log(json.frequency)

  // Clear all of the text boxes

return false;


  });


  database.ref().on("child_added", function(snapshot){
    console.log(snapshot.val());


//update the variables with the data from the database

trainName = snapshot.val().trainName;
destination = snapshot.val().destination;
firstTrainUnix = snapshot.val().firstTrainUnix;
frequency = snapshot.val().frequency;


// moment.js methods for time calls and calculations.line 57 to 65 

var firstTrainMoment = moment(firstTrainUnix,"HH:mm");
var nowMoment = moment(); // creates a moment object of current date and time and storing it in a variable whenever the user click the submit button

var minutesSinceFirstArrival = nowMoment.diff(firstTrainMoment,"minutes");
var minutesSinceLastArrival = minutesSinceFirstArrival % frequency;
var minutesAway = frequency - minutesSinceLastArrival;

var nextArrival = nowMoment.add(minutesAway,"minutes");
var formatNextArrival = nextArrival.format("HH:mm");


 // add table
  var tr = $('<tr>');
  var a = $('<td>');
  var b = $('<td>');
  var c = $('<td>');
  var d = $('<td>');
  var e = $('<td>');
  a.append(trainName);
  b.append(destination);
  c.append(frequency);
  d.append(formatNextArrival);
  e.append(minutesAway);
  tr.append(a).append(b).append(c).append(d).append(e);
  $('#newTrains').append(tr);

 
    
  


  });





 



