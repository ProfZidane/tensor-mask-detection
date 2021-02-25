
// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/BlP1OZ89F/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let stat;

let socket = io();
// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  var cnv = createCanvas(740, window.innerHeight-10);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(5,5);
  // Create the video
  video = createCapture(VIDEO);
  video.size(740, window.innerHeight-10);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
  //whoFunction();
}

function draw() { 
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  if (label === "Wrong: No Mask" && stat.confidence > 0.85) {
    document.getElementById('success').style.backgroundColor = "white";
    document.getElementById('fail').style.backgroundColor = "red";  
    setTimeout(() => {
      socket.emit('signal', label);
    },4000);    
  } else if (label === "Correct: Mask On" && stat.confidence > 0.85) {
    document.getElementById('success').style.backgroundColor = "green";
    document.getElementById('fail').style.backgroundColor = "white";
    setTimeout(() => {
      socket.emit('signal', label);
    },4000);
  }
  /*fill('red');
  textSize(70);
  textAlign(CENTER);
  text(label, width / 2, height - 4);*/
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  console.log(results[0]);
  stat = results[0];
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}

function whoFunction() {
  var x = document.createElement("IFRAME");
  x.setAttribute("src", "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/when-and-how-to-use-masks");
  x.style.width = '640px';
  x.style.height = '520'
  document.body.appendChild(x);
}