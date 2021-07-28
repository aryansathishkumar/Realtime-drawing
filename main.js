function preload()
{
    
}

noseX = 0;
noseY = 0;
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
varX = 0;
varY = 0;
right_total = 0;
left_total = 0;
var_right = 0;
var_left = 0;

function setup()
{
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(450, 450);
    video.position(100, 225);

    var poseNet = ml5.poseNet(video, loaded);
    poseNet.on("pose", getposes);
}
function getposes(results)
{
    console.log(results);

    noseX = results[0].pose.nose.x;
    noseY = results[0].pose.nose.y;
    
    leftwristX = results[0].pose.leftWrist.x;
    leftwristY = results[0].pose.leftWrist.y;

    rightwristX = results[0].pose.rightWrist.x;
    rightwristY = results[0].pose.rightWrist.y;

    right_total = rightwristX + rightwristY;
    left_total = leftwristX + leftwristY;

    var_right = (right_total - left_total);
    var_left = (left_total - right_total);

}
function draw()
{
    if(right_total > left_total)
    {
        fill("pink");
        rect(noseX, noseY, var_right, var_right);
        document.getElementById("width").innerHTML = Math.floor(var_right);
        document.getElementById("height").innerHTML = Math.floor(var_right);
        setTimeout(function(){
          fill("grey")
          rect(0, 0, 500, 400);  
        }, 700);
    }
    else if(left_total > right_total)
    {
        fill("pink");
        rect(noseX, noseY, var_left, var_left);
        document.getElementById("width").innerHTML = Math.floor(var_left);
        document.getElementById("height").innerHTML = Math.floor(var_left);
        setTimeout(function(){
            fill("grey")
            rect(0, 0, 500, 400);  
          }, 700);
    }
}    
function loaded()
{
    console.log(ml5.version, "model loaded")
}
