song1 = "";
song2 = "";
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristy=0;
score = 0;
song_to_play ="";
scoreLeftWrist = "";

function preload(){
    song1 = loadSound("song1.mp3");
    song2 = loadSound("song2.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);   
}
function draw(){
    image(video, 0, 0, 600, 500);
    stroke("red");
    fill("red");
    if(scoreLeftWrist>0.2){
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "volume is"+volume;
        song.setVolume(volume);
    }
   
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log("poseNet is initialized");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist x ="+rightWristX+"right wrist y ="+rightWristY);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist x ="+leftWristX+"left wrist y ="+leftWristY);
    }
}