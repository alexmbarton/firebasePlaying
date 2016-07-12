"use strict";

let firebaseSDK = require("firebase");

let firebaseInstance = firebaseSDK.initializeApp({
	serviceAccount: "firebase-key.json",
	databaseURL: "https://fir-test-d8fc1.firebaseio.com/"
});



// Question: What is the difference between firebase and server time?


// Set the time
let timeNode = firebaseInstance.database().ref("time");

timeNode
	.set(firebaseSDK.database.ServerValue.TIMESTAMP)

	.then(function(snapshot){
		
		let localTime = new Date().getTime();

		timeNode.once("value")

			.then(function(defSnap){

				let serverTime = defSnap.val();

				let diff = serverTime - localTime;

				if( diff < 0 ) {
					console.log("The serverTime is %d milliseconds behind local time",diff);
				} else {
					console.log("The serverTime is %d milliseconds ahead of local time",diff);
				}

			})

			.then(function() {

				process.exit();

			});
		
	}, function(error) {

		console.error(error);

	});