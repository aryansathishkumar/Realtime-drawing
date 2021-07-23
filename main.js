function preload()
{
    
}

noseX = 0;
noseY = 0;
leftAnkleX = 0;
leftAnkleY = 0;
rightAnkleX = 0;
rightAnkleY = 0;
varX = 0;
varY = 0;
right_total = 0;
left_total = 0;
var_right = 0;
var_left = 0;

function setup()
{
    canvas = createCanvas(900, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();

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
    image(video, 0, 0, 400, 400);
    if(right_total > left_total)
    {
        fill("pink");
        rect(noseX + 400, noseY, var_right, var_right);
        setTimeout(function(){
          fill("grey")
          rect(401, 0, 500, 400);  
        }, 700);
    }
    else if(left_total > right_total)
    {
        fill("pink");
        rect(noseX + 400, noseY, var_left, var_left);
        setTimeout(function(){
            fill("grey")
            rect(401, 0, 500, 400);  
          }, 700);
    }
    /*else
    {
        window.alert("There is an error.Try reloading the page.We make sure to not happen this thing again")
    }*/
}    
function loaded()
{
    console.log(ml5.version, "model loaded")
}
