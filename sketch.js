let classifier;  // Initialize the Image Classifier method with MobileNet and a callback needs to be passed.
let img;
let resultsFromImage = [];

const socket = io();

let camera = document.getElementById('camera');

let listImages = [
    'https://images-na.ssl-images-amazon.com/images/I/71+mDoHG4mL.png',
    'https://s2.glbimg.com/XFjLmcpddqLuwc71SogRH7v0fss=/0x0:3632x3484/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/s/8/rSUkDRRUqEGVzHylABsw/gatos-disponiveis-para-adocao-sao-do-ccz-e-de-protetoras-da-cidade.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg',
    'https://www.collinsdictionary.com/images/thumb/cat_156310937_250.jpg?version=4.0.267',
]

function preload() {
    // classifier = ml5.imageClassifier('MobileNet');
    classifier = ml5.objectDetector('cocossd');
    img = loadImage('https://images-na.ssl-images-amazon.com/images/I/71+mDoHG4mL.png');
    // img = loadImage('https://c.tenor.com/4au2TL7vYXcAAAAC/vilnius-traffic.gif');
}

// The function below will determine and setup the image sizes, get the results as image.
function setup() {
    createCanvas(640, 480);
}

function initProgram() {

    // make a for loop to iterate through the list of images every 1 second.
    for (let i = 0; i < listImages.length; i++) {
        setTimeout( async function () {
            img = await loadImage(listImages[i]);
            // clear the canvas and redraw the image.
            clear();
            classifier.detect(img, gotResult);
        }, i * 500);
    }

    // classifier.detect(img, gotResult);
    // image(img, 0, 0);
}

// A function to run when we get any errors in console and the results.
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }

    resultsFromImage = results;
    console.log(results);
    drawImage();

    // createDiv('Label: ' + results[0].label);
    // createDiv('Confidence: ' + nf(results[0].confidence, 0, 2));
}

//function to draw the objects on the screen.
function drawImage(){
    image(img, 0, 0)
    
    for(let i = 0; i < resultsFromImage.length; i++)
    {
        let object = resultsFromImage[i];
        stroke(0, 255, 0);
        strokeWeight(4);
        noFill();
        rect(object.x, object.y, object.width, object.height);
        stroke(0, 0, 0);
        fill(255);
        textSize(24);
        text(object.label, object.x + 10, object.y + 25);
    }
}