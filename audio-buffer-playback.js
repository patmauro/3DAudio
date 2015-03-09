/* Note: initializations moved to "inits.js" */

/*=========================
AUDIO BUFFER - fetchSound()
=========================*/
/*	Uses Daniel Guerrero's "Base64Binary" package to load in sound information
	from a 64-bit string that has been computed in advance, rather than from an 
	actual audio file. While indirect, this considerably simplifies the process by
	eliminating the need to rely on a server to ensure proper audio loading. 
	Is first called in a trackChange() at the end of inits.js.
*/
function fetchSound() {
	//ensures initialization of audio context
	if (!window.context) {
		context = new AudioContext();
	}
	//Establish needed variables
	var buffer = null;
	var isLoaded = false;

	//Loads in audio from a given 64bit-string - track determined by user input.
	var getSound = Base64Binary.decodeArrayBuffer(soundFile);
	context.decodeAudioData(getSound, function(buffer) {
			sfx = buffer;
			isLoaded = true;
		}
	);
	getSound.send();
}

/*====================
ENVIRONMENT GENERATION
=====================*/

//	Resets posAngle once the value hits 2PI Radians
function posnCheck(){
	if(posAngle >= 2*Math.PI){
		posAngle = 0;
	}
}

/*	Generates the Audio Environment by
	increasing posAngle by 0.025 every 50ms,
	which posnCheck resets to 0 once it hits 2PI Radians,
	effectively creating a continuous circular movement.
	We then generate 3-dimensional coordinates from this data:
	Y-coordinates are, in this case, always zero but
	Channel 0's X-Coordinate is set to cos(theta),
	Channel 1's X-Coordinate is set to -cos(theta), and
	both Channel's Z-Coordinates are set to sin(theta).
*/
function startSpin(){
	setInterval(function(){
		//Checks to see if posAngle>=2PI, if so, resets to 0
		posnCheck();
		//Increases the value of posAngle by (pi/125)
		posAngle+=(Math.PI*0.008);
		//Prints current angle in degrees (rounded) to the HTML id "timerSpace"
		document.getElementById('timerSpace').innerHTML = Math.floor(180*(posAngle/Math.PI));
		//Generates our X and Z coordinates based on the current angle
		var xR = Math.cos(posAngle);
		var xL = 0 - (Math.cos(posAngle));
		var z = Math.sin(posAngle);
		//Displays these coordinates in the interface, rounded to 2 decimal places
		document.getElementById('xCoordR').innerHTML = xR.toFixed(2);
		document.getElementById('xCoordL').innerHTML = xL.toFixed(2);
		document.getElementById('zCoord').innerHTML = z.toFixed(2);
		//Finally, if AutoPan is enabled, apply these coordinates to the panners.
		if(autoPan){
		pannerR.setPosition(xR, 0, z);
		pannerL.setPosition(xL, 0, z);
	}
	//Last bit of "setInterval" statement, indicating a 50ms interval. 
	}, 50);
}

/*===========================
AUDIO PLAYER - audioProcess()
===========================*/
/*	Function called to play sound. Loads in sound from buffer,
	manipulates it and routes it through several audio nodes,
	then finally passes it through to output (context.destination).
*/
function audioProcess() {
	//Load in sound from Buffer
	playSound = context.createBufferSource(); 
	playSound.buffer = sfx;
// SOUND MANIPULATION:
	//Loops audio if "looping" is true
	//(true by default; changed via UI)
	playSound.loop = looping;
// SOUND ROUTING:
	//Routes Source Audio to Splitter
	playSound.connect(splitter);
	//Routes Left Channel to Left Panner
	splitter.connect(pannerL, 0);
	//Routes Right Channel to Right Panner
	splitter.connect(pannerR, 1);
	//Routes both streams to Volume Node
	pannerL.connect(volume);
	pannerR.connect(volume);
	//Routes Volume Node to Final Output
	volume.connect(context.destination);
	//Initiates Sound from Beginning
	playSound.start(0); 
}


/*====================
PLAYBACK TRIGGERS, ETC 
====================*/
// Function for Button Presses that initiates playback
function playClick() {
	if(playSound!=null){
		playSound.stop(0);
	}
    audioProcess();
}
// Function for Button Presses that ceases Audio Playback
function stopClick() {
	playSound.stop(0);
}
// Function that allows for buffered audio source to be changed
function trackChange(track) {
	if(playSound!=null){
		playSound.stop(0);
	}
	// While stopping all sound here isn't *strictly* necessary,
	// it makes things a lot easier to deal with in the long run.
	if(track == "channelTest"){soundFile = channelTest;}
	else if(track == "pianoChime"){soundFile = pianoChime;}
	else if(track == "dualSpires"){soundFile = dualSpires;}
	else if(track == "glassWoodTap"){soundFile = glassWoodTap;}
	//Resets the buffer with new audio source
	fetchSound();
}

/*===========
BROWSER CHECK 
===========*/
// Throws an error/warning if a known problematic browser is being used.
function browserCheck(){
/*	Checks to see if values that should have been initialized already
	failed to initialize; indicated a browser with no Web Audio API support
	(Such as IE at the time of this writing.)	*/
	if(soundFile==null){
		document.getElementById('non-ui').innerHTML = "<font color='red' size='3'><b>Your browser does not support the Web Audio API.</b><br>The program will not run.</font>";
	}
/*	Otherwise, checks to see if user agent is Safari,
	Which is not 100% standards-compliant, and thus has a bug.	*/
	else if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1){
		document.getElementById('non-ui').innerHTML += 
		"<br><br><font color='red'><font size='3'><b>Safari detected<br></b></font>Due to standards-noncompliance, only the first selection will play.</font>";
	}
}