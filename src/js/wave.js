// Special thanks to this video for walking through the code: https://www.youtube.com/watch?v=IBHpSkGZtNM
// Create a new instance of an audio object and adjust some of its properties
var audio = new Audio();
audio.src = 'wish-you-were-here.wav';
audio.controls = true;
audio.loop = true;
audio.autoplay = true;  // automatically plays upon page load
// audio.crossOrigin = "anonymous";
// audio.muted = true;

// Establish all variables that your Analyser will use
var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
// Initialize the MP3 player after the page loads all of its HTML into the window
window.addEventListener("load", initMp3Player, false);
function initMp3Player(){
    document.getElementById('audio_box').appendChild(audio);
    context = new AudioContext(); // AudioContext object instance
    analyser = context.createAnalyser(); // AnalyserNode method
    //GainNode = context.createGain();
    canvas = document.getElementById('analyser_render');
    ctx = canvas.getContext('2d');

    // Re-route audio playback into the processing graph of the AudioContext
    source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);
    //source.connect(GainNode)
    //GainNode.gain.value = 1;
    frameLooper();
}
// frameLooper() animates any style of graphics you wish to the audio frequency
// Looping at the default frame rate that the browser provides(approx. 60 FPS)
function frameLooper(){
    window.requestAnimationFrame(frameLooper);
    fbc_array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(fbc_array);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    ctx.fillStyle = '#2EFFF7'; // bar color

    bars = 75; // number of bars

    for (var i = 0; i < bars; i++) { // dimensions of each bar
        bar_x = i * 5;
        bar_width = 3;
        bar_height = -(fbc_array[i] / 5);

        ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
    }
}

// may have to go to chrome://flags/#autoplay-policy and change autoplay options for this to work in Chrome
// also need to run from server for Chrome or else CORS won't allow autoplay for audio
