video = "";
status = "";
objects = [];


function setup() {
 canvas = createCanvas(480, 380);
 canvas.center();
 
 video = createCapture(VIDEO);
 video.hide();
}

function draw() {
 image(video, 0, 0, 480, 380);
 if (status != "") {
  objectDetector.detect(video, gotResult);  
  for (i = 0; i < objects.length; i++) {
   document.getElementById("status").innerHTML = "Status : Objects Detected";
   
   fill("#FF0000");
   percent = floor(objects[i].confidence * 100);
   text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
   noFill();
   stroke("#FF0000");
   rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
   if(objects[i].label == objects_name) {
    video.stop();
    objectDetector.detect(gotResult);
    document.getElementById("object_status").innerHTML = objects_name + " Found"; 
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(objects_name + "Found");
    synth.speak(utterThis);

   }   
   else {
    document.getElementById("object_status").innerHTML = object_name + " Not Found"; 
   }
  }
 }
}

function start() {
 objectDetector = ml5.objectDetector('cocossd', modelLoaded);
 document.getElementById("status").innerHTML = "Status : Detecting Objects";
 objects_name = document.getElementById("objects_name").value;

}

function gotResult(error, results) {
 if (error) {
  console.log(error);
 }
 console.log(results);
 objects = results;
 
}

function modelLoaded () {
 console.log("Model Loaded!");
 status = true;
 video.loop();
 video.speed(1);
 video.volume(0);
}