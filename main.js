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
    
    leftAnkleX = results[0].pose.leftAnkle.x;
    leftAnkleY = results[0].pose.leftAnkle.y;

    rightAnkleX = results[0].pose.rightAnkle.x;
    rightAnkleY = results[0].pose.rightAnkle.y;

    right_total = rightAnkleX + rightAnkleY;
    left_total = leftAnkleX + rightAnkleX;

    var_right = (right_total - left_total)*2;
    var_left = (left_total-right_total)*2;

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
        }, 1000);
    }
    else if(left_total > right_total)
    {
        fill("pink");
        rect(noseX + 400, noseY, var_left, var_right);
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
