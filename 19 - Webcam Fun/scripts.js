const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

// get the video from your webcan, requires secured connection, eg localhost or https
function getVideo() {
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(localMediaStream => {
      // console.log(localMediaStream)
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      console.error(`OH NO!!`, err);
    });
    // catch is for an error message where the user doesnt allow access to webcam
};

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  // console.log(width, height)
  canvas.width = width;
  canvas.height = height;

  // inserts an image into the canvas at 16ms
  return setInterval(() => {
    // pass it a video/image, starting at top left (0 ,0), and set the width and height
    ctx.drawImage(video, 0, 0, width, height);
    // take the pixels out of the image
    let pixels = ctx.getImageData(0, 0, width, height);
    // mess with the pixels value to distort it
    pixels = redEffect(pixels);
    // need to comment in one or the other
    pixels = rgbSplit(pixels);
    // gives transparency effect or ghost like appearance
    ctx.globalAlpha = 0.1;
    // put the new pixel values back in
    ctx.putImageData(pixels, 0, 0);
  }, 16);
};

function takePhoto() {
  // takes a screenshot
  snap.currentTime = 0;
  // plays the sound of a camera click
  snap.play();
  const data = canvas.toDataURL('image/jpeg');
  // console.log(data);
  const link = document.createElement('a');
  // the following allows you to take a screenshot and download onto the users harddrive, saves as screenshot.jpeg
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="Screenshot"/>`;
  strip.insertBefore(link, strip.firstChild);
};

function redEffect(pixels) {
  for(let i = 0; i< pixels.data.length; i += 4) {
    // changes the pixels values, ie mess with the data from the webcam
    pixels.data[i] = pixels.data[i] + 100 // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 100 // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5 // BLUE
  }
  return pixels;
};

function rgbSplit(pixels) {
  for(let i = 0; i< pixels.data.length; i += 4) {
    // pulls the rgb and gives you a form of blur effect
    pixels.data[i - 150] = pixels.data[i] // RED
    pixels.data[i + 100] = pixels.data[i + 1] // GREEN
    pixels.data[i - 150] = pixels.data[i + 2] // BLUE
  }
  return pixels;
};

getVideo();
//allows the paint to canvas to run on page load
video.addEventListener('canplay', paintToCanvas);
