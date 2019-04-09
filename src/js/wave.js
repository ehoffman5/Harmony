// Create the Audio Context

var context = new AudioContext();
var analyser = context.createAnalyser();
var WIDTH = 600;
var HEIGHT = 600;

function playSound() {
    var osc = context.createOscillator();
    osc.frequency.value = 60;
    osc.type = 'square';
    
    oscGain = context.createGain();
    oscGain.gain.value = 0.2;

    osc.start(context.currentTime);
    osc.stop(context.currentTime + 3);

    osc.connect(oscGain);   
    oscGain.connect(analyser); // Connect oscillator to analyser node
    analyser.connect(context.destination);
}


var canvas = document.querySelector('.visualizer');
var myCanvas = canvas.getContext("2d");

analyser.fftSize = 256;
var bufferLength = analyser.frequencyBinCount;
console.log(bufferLength);
var dataArray = new Uint8Array(bufferLength);

myCanvas.clearRect(0, 0, WIDTH, HEIGHT);

function draw() {
    drawVisual = requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);

    myCanvas.fillStyle = 'rgb(0, 0, 0)';
    myCanvas.fillRect(0, 0, WIDTH, HEIGHT);

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    for(var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];

      myCanvas.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
      myCanvas.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);

      x += barWidth + 1;
    }
};

var analyserButton = document.getElementById("myAnalyserButton")

analyserButton.addEventListener('click', function() {
  playSound();
  draw();
});