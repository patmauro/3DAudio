/*=============
INITIALIZATIONS	
=============*/
// Executing these calls here (at the end of <body>)
// makes for more agreeable program execution.


/*=================
Audio Context Nodes
=================*/
// Creates and Initializes Audio Context
var context = new AudioContext();

// Creates a Gain Node from our Audio Context
var volume = context.createGain();

// Creates Panner Nodes from our Audio Context
	// Right Panner Node Declarations
var pannerR = context.createPanner();
pannerR.panningModel = "equalpower";
pannerR.setPosition(1, 0, 0);
	// Left Panner Node Declarations
var pannerL = context.createPanner();
pannerL.panningModel = "equalpower";
pannerL.setPosition(-1, 0, 0);
/*	NOTE: We COULD enable hrtfs here by setting
	panningModel to "hrtf" and then compensating -
	but for this application, it's a little overkill,
	so we're using a simpler approach using basic Trig.
*/

// Creates a Splitter Node from our Audio Context
var splitter = context.createChannelSplitter(2);


/*===================
Placeholder Variables
===================*/
// Boolean representing whether or not the "Loop" option on the UI is selected
// (Here enabled by default)
var looping = true;

// Placeholder for our Angle value,
// which forms the basis of our Audio Environment
var posAngle = 0;

// Boolean representing whether or not the "autoPan" option on the UI is selected
// (Here enabled by default)
var autoPan = true;

// Placeholder for Sound Data 
var sfx;

// Placeholder for buffered sound
// (Not declaring this inside audioProcess() allows it to be more easily modified)
var playSound;

// Placeholder for user's choice of sound file; defaults to "Channel Test"
var soundFile;

// Placeholder representing the current element in the HTML Track List Form
var setTrack = document.getElementById("trackList");


/*================
Document Listeners
================*/
// Establish Play & Stop Button Listeners
document.getElementById("playButton").addEventListener("click", playClick);
document.getElementById("stopButton").addEventListener("click", function(){
	playSound.stop(0);
});

// Establish Track List Menu Listener
document.getElementById("trackList").addEventListener("change", function(){
	trackChange(setTrack.options[setTrack.selectedIndex].value);
});

// Establish Volume Slider Listener & Function
document.getElementById("panBar").addEventListener("change", function(){
	if(!autoPan){
	pannerR.setPosition(this.value, 0, (1 - Math.abs(this.value)));
	pannerL.setPosition((0 - this.value), 0, (1 - Math.abs(0 - this.value)));
}
});

// Establish Pan Slider Listener & Function
document.getElementById("volumeBar").addEventListener("change", function(){
	volume.gain.value = this.value;
});

// Establish Loop Toogler Listener & Function
document.getElementById("loopOption").addEventListener("change", function(){
	looping = !looping;
});

// Establish Manual Pan Radio Button Listener & Function
document.getElementById("manPanOpt").addEventListener("click", function(){
	autoPan = false;
	pannerR.setPosition(panBar.value, 0, (1 - Math.abs(panBar.value)));
	pannerL.setPosition((0 - panBar.value), 0, (1 - Math.abs(0 - panBar.value)));
});

// Establish Auto Pan Radio Button Listener & Function
document.getElementById("autoPanOpt").addEventListener("click", function(){
	autoPan = true;
});


/*===============================
Calls to Initiate the Environment
===============================*/
//Initiate Creation of 3D Space
startSpin();
//Initiate Buffer based on Current Setting in HTML Form
trackChange(setTrack.options[setTrack.selectedIndex].value);