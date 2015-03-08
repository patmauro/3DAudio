======================================
3D AUDIO SIMULATION WITH WEB AUDIO API
      Created by Patrick Mauro  
======================================

An implementation of the Web Audio API that takes one of four stereo audio sources I have provided and processes it to revolve the two points of sound around the y axis in a circular fashion at a constant rate, creating a simulated representation of 3-dimensional sound.

This is one of my first more involved coding projects after having been away from it for a few years. The object of this project was essentially to teach me the basics of the Web Audio API. Since I was learning as I went along, needless to say development was a little bumpy - but I'm extremely pleased with the end results.

I realized early on that, without access to a reliable web server, I wouldn't be able to ensure audio was loading properly. As an alternative, I researched and implemented a system where audio buffers from a 64-bit string representation of an audio file rather than the file itself, using the "base64-binary.js" library created by Daniel Guerrero.

The environment is rendered using basic trig - The 3D space is created from a simple variable representing an angle - this variable accumulates until it reaches 2PI, at which point it resets to 0 - thus creating a circular movement. From this changing angle, we then generate coordinates in space by calculating cos(theta) for our X-Coordinates, and sin(theta) for our Z-coordinates. These values are then passed to the Web Audio Panner node, which then creates a representation of what sound from that particular point in space sounds like. To create our Binaural effect, we simply split the audio channels using a SplitterNode, send each to a different PannerNode, and then pass the result of both through to volume, which then passes the sound to the output.

Originally, I had considered using HRTFs, but I later decided using them seemed a bit like overkill for an implementation this simple, so I instead simplified things a bit, using the "equalpower" as the Panning Model instead.

I also rely on the library "AudioContextMonkey" by Chris Wilson, which "downgrades" Web Audio API code for standards-noncompliant browsers (namely, Safari). As it is not a *perfect* solution, I also include a warning on detection of Safari, pointing out bugs (only first audio track plays correctly). IE11 does not support Web Audio at *all* as of this writing, and so a similar warning is thrown as well on detection of IE or any browser not fully supporting Web Audio (algorithm checks to make sure our default variables are no longer null shortly after launch).

Aside from the libraries I imported, this project is, for the most part, completely original - the code is mostly scratch, all four sound files are original audio I recorded, and the design I drafted and then implemented on my own as well; including the favicon. It's been exciting being able to work on a coding project like this again, and I hope to work on more like this soon.

3/6/15 - Completed Project
3/7/15 - Improvements and bugfixes
		- Cleaned UI
		- Switched all "px" to relevant "em"
		- Project now displays stably on Chrome, Firefox, Safari and IE
		- Switched Google Fonts call to javascript, fixing font issues
		- Project now runs on Safari albeit with a limitation due to standards noncompliance
		- Error message thrown for IE indicating standards noncompliance


Patrick Mauro
patrick@patrickmauro.net