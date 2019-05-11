// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Reserved and Waiting List Data
// =============================================================
var reservedList = [
  {
    routeName: routeName,
    phoneNum: phoneNum,
    email: email,
    uniqueID: uniqueID
  }
];

var waitingList = []
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../html/home.html"));
});

app.get("/reserved", function(req, res) {
  res.sendFile(path.join(__dirname, "../html/reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "../html/tables.html"));
});


// Displays the reserved list
app.get("/api/tables", function(req, res) {
  return res.json(reservedList);
});
// Displays the waiting list
app.get("/api/waitlist", function(req, res) {
  return res.json(waitingList);
});


// Create New Reservation - takes in JSON input
app.post("/api/reserved", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newReservation
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReservation.uniqueID = reservedList.routeName.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation)
 if (reservedList.length < 5){
    reservedList.push(newReservation);
    res.json(newReservation);
  }
  else {
    waitingList.push(newReservation);
    res.json(newReservation);
  };
 
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
