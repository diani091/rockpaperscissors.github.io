// Initialize Firebase
 var config = {
    apiKey: "AIzaSyBrKetz_Nwymsq9H4eqaa2g9YACigfd2ks",
    authDomain: "rock-paper-scissors-eaac3.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-eaac3.firebaseio.com",
    projectId: "rock-paper-scissors-eaac3",
    storageBucket: "rock-paper-scissors-eaac3.appspot.com",
    messagingSenderId: "752778274186"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var currentTime = moment();

database.ref().on("child_added", function(childSnap) {

//takes info from input form
    var name = childSnap.val().name;
    var destination = childSnap.val().destination;
    var firstTrain = childSnap.val().firstTrain;
    var frequency = childSnap.val().frequency;
    var min = childSnap.val().min;
    var next = childSnap.val().next;


    //adds input to table
    $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + min + "</td></tr>");
});

database.ref().on("value", function(snapshot) {
   
});

$("#addTrainBtn").on("click", function() {

    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = $("#firstInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();


    var firstTrainConverted = moment(firstTrain, "hh:mm").subtract("1, years");
    //time difference between times
    var difference = currentTime.diff(moment(firstTrainConverted), "minutes");

    var remainder = difference % frequency;
    var minUntilTrain = frequency - remainder;
    var nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm a");

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        min: minUntilTrain,
        next: nextTrain
    }

    console.log(newTrain);

    //uploads data to database
    database.ref().push(newTrain);

    //clears text boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstInput").val("");
    $("#frequencyInput").val("");

    return false;
});