img = "";
status = "";
objects = [];

function preload(){
    img = loadImage('fan.jpg');
}

function setup(){
    canvas = createCanvas(640,420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw(){
    image(img, 0, 0, 640, 420);

    if (status != ""){
        for(i = 0; i < objects.length; i++){
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text("Fan" + "   " + percent + "%", objects[i].x+20, objects[i].y+20);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            document.getElementById("status").innerHTML = "Status : Object(s) Detected    No. of objects : "+objects.length;
        }
    }
}

function modelLoaded(){
    console.log("model loaded!");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}
