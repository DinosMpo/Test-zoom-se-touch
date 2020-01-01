// Global vars to cache event state
var evCache = new Array();
var prevDiff = -1;
let touches = 0;

//step 1
var target = document.getElementById('target');

target.addEventListener('touchstart', (event) => {
	// console.log(event.touches.length);
	evCache.push(event.touches[touches]);
	log('touchStart: ', event.touches[event.touches.length-1]);
	// event.target.style.background = "pink";
	console.log(evCache[touches].clientX);
	touches++;
	console.log("touches: " + touches);
});

target.addEventListener('touchend', (event) => {
	touchup_handler(event);
	console.log(event);
	touches--;
	console.log("touches: " + touches);
});

target.addEventListener('touchmove', (event) => {
	touchmove_handler(event);
});

target.addEventListener('touchcancel', (event) => {
	// touchup_handler(event);
});

var o = document.getElementsByTagName('output')[0];
function log(prefix, ev) {
	var s = prefix + ": touchID = " + ev.identifier;
	o.innerHTML += s + "";
	console.log(ev.clientX);
}

function touchmove_handler(event) {
	console.log(event);
	console.log(event.changedTouches[0]);
	// Find this event in the cache and update its record with this event
	for(var i=0; i<evCache.length; i++) {
		if(event.changedTouches[0].identifier == evCache[i].identifier) {
			evCache[i] = event.changedTouches[0];
			break;
		}
	}
	// If two pointers are down, check for pinch gestures
	// event.target.style.background = "grey";
	if (evCache.length == 2) {
		// Calculate the distance between the two pointers
		var curDiff = Math.abs(evCache[0].clientX - evCache[1].clientX);
		o.innerHTML += curDiff + "???? ";
		// event.target.style.background = "yellow";
		if (prevDiff > 0) {
			// event.target.style.background = "red";
			if (curDiff > prevDiff) {
				// The distance between the two pointers has increased
				log('Pinch moving OUT -> Zoom in', event.touches[event.touches.length-1]);
				event.target.style.background = "pink";
			}
			if (curDiff < prevDiff) {
				// The distance between the two pointers has decreased
				log('Pinch moving IN -> Zoom out', event.touches[event.touches.length-1]);
				event.target.style.background = "grey";
			}
		}else{
			event.target.style.background = "blue";
		}
		// for(var i=0;i<event.changedTouches.length; i++) {
		// 	log('changed touch: ' + event.changedTouches[i].identifier, event.touches[event.touches.length-1]);
		// }

		// Cache the distance for the next move event
		prevDiff = curDiff;
	}
}

function touchup_handler(event) {
	// log(event.type, event);
	// Remove this pointer from the cache and reset the target's
	// background and border
	event.target.style.background = "white";
	event.target.style.border = "1px solid black";

	// If the number of pointers down is less than two then reset diff tracker
	if (evCache.length < 2) {
		prevDiff = -1;
	}

	for(var i=0;i<event.changedTouches.length; i++) {
		log('changed touch: ' + event.changedTouches[i].identifier, i);
		console.log(event.changedTouches[i].identifier);
		remove_event(event.changedTouches[i]);
	}
}

// Cache management
function remove_event(event) {
	// Remove this event from the target's cache
	for (var i = 0; i<evCache.length; i++) {
		if(evCache[i].identifier == event.identifier) {
			evCache.splice(i, 1);
			console.log('ee ooo');
			break;
		}
	}
}

// $(target).on('mousedown', (ev) => {
// 	console.log(ev);
// });

// Infos
// touches[0], touches[1]

// // //gia to touch
// // //
// // //prepei na kanoume cached ta event gia na mporesoume na anoume to zoom sto touch

// // // Global vars to cache event state
// // var evCache = new Array();
// // var prevDiff = -1;

// // function init() {
// // 	// Install event handlers for the pointer target
// // 	var el = document.getElementById('target');
// // 	el.onpointerdown = pointerdown_handler;
// // 	el.onpointermove = pointermove_handler;

// // 	// Use same handler for pointer{up, cancel,out,leave} events since
// // 	// the semantics for these events - in this app - are the same.
// // 	el.onpointerup = pointerup_handler;
// // 	el.onpointercancel = pointerup_handler;
// // 	el.onpointerout = pointerup_handler;
// // 	el.onpointerleave = pointerup_handler;
// // }

// // function pointerdown_handler(ev) {
// // 	// The pointerdown event signals the start of a touch interaction.
// // 	// This event is cached to support 2-finger gestures
// // 	evCache.push(ev);
// // 	log('pointerDown', ev);
// // }

// // function pointermove_handler(ev) {
// // 	// This function implements a 2-pointer horizontal pinch/zoom gesture.
// // 	//
// // 	// If the distance between the two pointers has increaded (zoom in),
// // 	// the target element's background is changed to "pink" and if the
// // 	// distance is decreasing (zoom out), the color is changed to "lightblue".
// // 	//
// // 	// This function sets the target element's border to "dashed" to visually
// // 	// indicate the pointer's target received a move event.
// // 	log("pointerMove", ev);
// // 	ev.target.style.border = "dashed";

// // 	//Find this event in the cache and update its record with this event
// // 	for (var i=0; i<evCache.length; i++ ) {
// // 		if (ev.pointerId == evCache[i].pointerId) {
// // 			evCache[i] = ev;
// // 			break;
// // 		}
// // 	}

// // 	// If two pointers are down, check for pinch gestures
// // 	if (evCache.length == 2) {
// // 		// Calculate the distance between the two pointers
// // 		var curDiff = Math.abs(evCache[0].clientX - evCache[1].clientX);

// // 		if (prevDiff > 0) {
// // 			if (curDiff > prevDiff) {
// // 				// The distance between the two pointers has increased
// // 				log('Pinch moving OUT -> Zoom in', ev);
// // 				ev.target.style.background = "pink";
// // 			}
// // 			if (curDiff < prevDiff) {
// // 				// The distance between the two pointers has decreased
// // 				log('Pinch moving IN -> Zoom out', ev);
// // 				ev.target.style.background = "lightblue";
// // 			}
// // 		}

// // 		// Cache the distance for the next move event
// // 		prevDiff = curDiff;
// // 	}
// // }

// // function pointerup_handler(ev) {
// // 	log(ev.type, ev);
// // 	// Remove this pointer from the cache and reset the target's
// // 	// background and border
// // 	remove_event(ev);
// // 	ev.target.style.background = "white";
// // 	ev.target.style.border = "1px solid black";

// // 	// If the number of pointers down is less than two then reset diff tracker
// // 	if (evCache.length < 2) {
// // 		prevDiff = -1;
// // 	}
// // }

// // // Cache management
// // function remove_event(ev) {
// // 	// Remove this event from the target's cache
// // 	for (var i = 0; i<evCache.length; i++) {
// // 		if(evCache[i].pointerId == ev.pointerId) {
// // 			evCache.splice(i, 1);
// // 			break;
// // 		}
// // 	}
// // }

// // Event logging
// // Log events flag
// var logEvents = true;

// // Logging/debugging functions
// function enableLog(ev) {
// 	logEvents = logEvents ? false : true;
// }

// function log(prefix, ev) {
// 	if (!logEvents) return;
// 	var o = document.getElementsByTagName('output')[0];
// 	var s = prefix + ": pointerID = " + ev.pointerId +
// 			" ; pointerType = " + ev.pointerType + 
// 			" ; isPrimary = " + ev.isPrimary;
// 	o.innerHTML += s + "";
// }

// function clearLog(event) {
// 	var o = document.getElementsByTagName('output')[0];
// 	o.innerHTML = "";
// }

// function init() {
// 	// Install event handlers for the ponter target
// 	var el = document.getElementById('target');
// 	el.ontouchdown = touchdown_handler;
// 	el.ontouchmove = touchmove_handler;

// 	// Use same handler for touch{up, cancel,out,leave} events since
// 	// the semantics for these events - in this app - are the same.
// 	el.ontouchup = touchup_handler;
// 	el.ontouchcancel = touchup_handler;
// 	el.ontouchout = touchup_handler;
// 	el.ontouchleave = touchup_handler;
// }


// // Global vars to cache event state
// var evCache = new Array();
// var prevDiff = -1;

// function touchdown_handler(ev) {
// 	// The touchdown event signals the start of a touch interaction.
// 	// This event is cached to support 2-finger gestures
// 	evCache.push(ev);
// 	log('touchDown: ', ev);
// }

// function touchmove_handler(ev) {
// 	// This function implements a 2-touch horizontal pinch/zoom gesture.
// 	//
// 	// If the distance between the two touchs has increaded (zoom in),
// 	// the target element's background is changed to "pink" and if the
// 	// distance is decreasing (zoom out), the color is changed to "lightblue".
// 	//
// 	// This function sets the target element's border to "dashed" to visually
// 	// indicate the pointer's target received a move event.
// 	log("touchMove: ", ev);
// 	ev.target.style.border = "dashed";

// 	//Find this event in the cache and update its record with this event
// 	for (var i=0; i<evCache.length; i++ ) {
// 		if (ev.pointerId == evCache[i].pointerId) {
// 			evCache[i] = ev;
// 			break;
// 		}
// 	}

// 	// If two pointers are down, check for pinch gestures
// 	if (evCache.length == 2) {
// 		// Calculate the distance between the two pointers
// 		var curDiff = Math.abs(evCache[0].clientX - evCache[1].clientX);

// 		if (prevDiff > 0) {
// 			if (curDiff > prevDiff) {
// 				// The distance between the two pointers has increased
// 				log('Pinch moving OUT -> Zoom in', ev);
// 				ev.target.style.background = "pink";
// 			}
// 			if (curDiff < prevDiff) {
// 				// The distance between the two pointers has decreased
// 				log('Pinch moving IN -> Zoom out', ev);
// 				ev.target.style.background = "lightblue";
// 			}
// 		}

// 		// Cache the distance for the next move event
// 		prevDiff = curDiff;
// 	}
// }

// function touchup_handler(ev) {
// 	log(ev.type, ev);
// 	// Remove this pointer from the cache and reset the target's
// 	// background and border
// 	remove_event(ev);
// 	ev.target.style.background = "white";
// 	ev.target.style.border = "1px solid black";

// 	// If the number of pointers down is less than two then reset diff tracker
// 	if (evCache.length < 2) {
// 		prevDiff = -1;
// 	}
// }

// // Cache management
// // function remove_event(ev) {
// // 	// Remove this event from the target's cache
// // 	for (var i = 0; i<evCache.length; i++) {
// // 		if(evCache[i].pointerId == ev.pointerId) {
// // 			evCache.splice(i, 1);
// // 			break;
// // 		}
// // 	}
// // }

//---- Mobile Events
// $(canvas).on('touchstart', function(event) {
// 	event.preventDefault();
// 	startPointTouchX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width) / 2));
// 	// startPointTouchY = Math.floor(event.touches[0].clientY - ((window.innerHeight - canvas.height) / 2));
// 	startPointTouchY = event.touches[0].clientY;
// 	if(state === 'level') {
// 		isDown = true;

// 		nonogram.fillCels(startPointTouchX, startPointTouchY);
// 		nonogram.findUserChoices(); // gt to exw edw auto?
// 		store(currentStage, nonogram.userChoices.levelGrid);
// 		store('rowNumbersGrid-'+currentStage, nonogram.userChoices.rowNumbersGrid);
// 		store('columnNumbersGrid-'+currentStage, nonogram.userChoices.columnNumbersGrid);
// 		nonogram.findProgress();
// 	}else if(state === 'multiplayer') {
// 		if(turn === true) {
// 			var gameData = nonogram.multiplayerFillCels(startPointTouchX, startPointTouchY);
// 			sock.emit('empty grid', gameData);
// 			turn = false;
// 			$("#info-current-progress").text("");
// 			$("#info-current-progress").text(nonogram.findProgress() + "%");
// 			if(nonogram.checkProgress()) {
// 				sock.emit('correct' , multiplayerGame);
// 			}else{
// 				$("#correct").hide();
// 				sock.emit('end-turn');
// 			}
// 		}
// 	}
// });

// $(canvas).on('touchend', function() {
// 	if(state === "level") {
// 		isDown = false;

// 		if(nonogram.checkProgress()) {
// 			$("#correct").show();
// 			store("correct-" + currentStage, 1);
// 			$(".correct-" + currentStage).show();
// 		}else{
// 			$("#correct").hide();
// 			store("correct-" + currentStage, 0);
// 			$(".correct-" + currentStage).hide();
// 		}
// 		nonogram.findUserChoices();
// 		store(currentStage, nonogram.userChoices.levelGrid);
// 		store('rowNumbersGrid-'+currentStage, nonogram.userChoices.rowNumbersGrid);
// 		store('columnNumbersGrid-'+currentStage, nonogram.userChoices.columnNumbersGrid);	
// 		$("#info-current-progress").text("");
// 		$("#info-current-progress").text(nonogram.findProgress() + "%");
// 	}
// });

// $(canvas).on('touchmove', function(event) {
// 	event.preventDefault();
// 	if(isDown){
// 		var touchX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width) / 2));
// 		var touchY = Math.floor(event.touches[0].clientY);
// 		nonogram.fillMultiCells(touchX, touchY, startPointTouchX, startPointTouchY);
// 	}
// });


