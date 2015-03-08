======================================
3D AUDIO SIMULATION WITH WEB AUDIO API
      Created by Patrick Mauro  
======================================

An implementation of the Web Audio API that takes one of four stereo audio sources I have provided and processes it to revolve the two channels as points around a y axis in a circular fashion at a constant rate, creating a simulated representation of 3-dimensional sound.

This is one of my first more involved coding projects after having been away from it for a few years, and what made it particularly fun is I was able to flex my music/audio and design muscles a bit in the process. The overall object of the project was essentially to teach me the basics of the Web Audio API, and since I was learning as I went along, needless to say development was a little bumpy - but I'm extremely pleased with the end results.

I realized early on that, without access to a reliable web server, I wouldn't be able to ensure audio was loading properly. As an alternative, I researched and implemented a system where audio buffers from a 64-bit string representation of an audio file rather than the file itself, using the "base64-binary.js" library created by Daniel Guerrero.

The 3D environment is rendered using basic trig: We begin with a simple variable representing an angle, and this variable accumulates until it reaches 2PI, at which point it resets to 0 - thus creating circular movement. From this changing angle, we then generate coordinates in space by calculating cos(theta) for our X-Coordinates, and sin(theta) for our Z-Coordinate. These values are then passed to the API-provided Audio Panner node, which then creates a representation of what sound from that particular point in space sounds like. To create our "binaural" effect, we simply split the audio channels using a Splitter node, send each to a different Panner node, and then pass the result of both through to the Volume node, which then finally passes the sound to the output.

Originally, I had considered using HRTFs for spatial representations, but it seemed a bit like overkill for an implementation this simple, so I instead simplified things a bit, using "equalpower" as the Panning Model instead.

I also use the library "AudioContextMonkey" by Chris Wilson, which "downgrades" Web Audio API code for standards-noncompliant browsers (namely Safari). But since it's still not a *perfect* solution, I also include a warning on detection of Safari, indicating the remaining bugs (only first audio track plays correctly). IE11 does not support the API at *all* as of this writing, and so a similar warning is thrown on detection of it or any other browser that does not support the API (algorithm checks to make sure our default variables are no longer null shortly after launch).

Aside from the libraries I imported, this project's content is, for the most part, completely original - the code is mostly from scratch, all four sound files are original audio I recorded, and the design I drafted and then implemented on my own (including the favicon). It's been exciting being able to work on a coding project like this again, and I hope to work on more soon.


Patrick Mauro
patrick@patrickmauro.net