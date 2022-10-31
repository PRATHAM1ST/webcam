// video data

const canvas = document.querySelector(".canvas");
const context = canvas.getContext("2d");
const video = document.querySelector(".player");
const refreshRate = 500;
const flipCamera = document.querySelector(".flipcamera");
var flip = 0
let stream = null;

// starting or flipping webcam
async function getVideo() {
  var constraints = {video: { facingMode: (flip? "user" : "environment")} }
  try{
   stream = await navigator.mediaDevices.getUserMedia(constraints);
   video.srcObject = stream;
   closeNotification.click();
   paintToCanvas();
  }
  catch(err){
     openNotification();
     closeNotification.style.visibility = "hidden";
     notification.innerHTML = "Oh no, you denied the webcam, no fun for you.";
     notification.style.color = "red";
   };
}

// updating canvas
function paintToCanvas() {
 
 canvas.width = 1;
 canvas.height = 1;

 setInterval(updateColour, refreshRate);
}


// getting and updating average webcam colour
function updateColour() {
 context.drawImage(video, 0, 0, canvas.width, canvas.height);

 let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

 let r = imageData.data[0];
 let g = imageData.data[1];
 let b = imageData.data[2];

 let clr = `rgb(${r}, ${g}, ${b})`;
 let root = document.documentElement;
 root.style.setProperty("--primary-clr", clr);
}

// listening flipping camera
flipCamera.addEventListener('click', ()=>{
  // closing previous camera data
  stream.getTracks().forEach(function(track) {
    track.stop();
   });
  video.src = '';
  flip = 1 - flip;
 getVideo();
})

// checking device
if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))){
    // flip hidden for desktops
    flipCamera.style.visibility = "hidden";
}

// starting the webcam
window.addEventListener("load", getVideo);




// listening help and information button clicks and updating notification
const notification = document.querySelector(".notification");
const information = document.querySelector(".information");
const help = document.querySelector(".help");
const closeNotification = document.querySelector(".closenotification");

function openNotification(){
  notification.style.height = "100%";
  closeNotification.style.opacity = "1";
  TotalVisits.style.height = "auto";
}


information.addEventListener('click', ()=>{
  openNotification();
  notification.innerHTML = `<p><h1><u id="colourful">Fun Project</u></h1></p><br/><p>The code 💻 is taking <u>Average colour</u> 🎨 from the video camera 📷 input in <u>Realtime</u> and updating the elements for fun. 😁✌️</p>`;

})

help.addEventListener('click', ()=>{
  openNotification();
  notification.innerHTML = `<p><h1><u id="colourful">How To Use This?</u></h1></p>
  <div>
  <li>Take any colourful object. 🎨</li>
  <li>Show it in front of camera. 📷</li>
  <li>Watch the changes happening on the screen. ⚽</li>
  <li>Choose your favorite color and Change the scene according to your choice. ⭐</li>
  <li>Don't forget to have fun and give me feedback on anything. 😁</li>
  <li>PEACE. ✌️</li>
  </div>`;
})

closeNotification.addEventListener('click', ()=>{
  notification.style.height = "0%";
  closeNotification.style.opacity = "0";
  TotalVisits.style.height = "0";
})

// counting and updating people visits
const TotalVisits = document.querySelector('.totalVisits');

function upadateVisitCount(){
  fetch('https://api.countapi.xyz/update/fun-webcam-project.netlify.app/project/?amount=1')
  .then(res => res.json())
  .then(res => {
    TotalVisits.innerHTML = `${res.value}<div style="font-size: 0.5rem;">Total No. Visits</div>`;
  })
}

upadateVisitCount();