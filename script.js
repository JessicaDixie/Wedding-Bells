// --- Image Rotation using .row and .column ---
const galleryImages = [
  "images/img1.png",
  "images/img2.png",
  "images/img3.png",
  "images/img4.png",
  "images/img5.png",
  "images/img6.jpg"
];

let currentIndex = 0;
const columns = document.querySelectorAll('.column img');

function rotateImages() {
  for (let i = 0; i < columns.length; i++) {
    const imgIndex = (currentIndex + i) % galleryImages.length;
    columns[i].classList.add('fade-out');

    // Delay changing the src until fade animation is done
    setTimeout(() => {
      columns[i].src = galleryImages[imgIndex];
      columns[i].classList.remove('fade-out');
    }, 500);
  }
  currentIndex = (currentIndex + 3) % galleryImages.length;
}

// Initial display + rotation every 10 seconds
rotateImages();
setInterval(rotateImages, 10000);

// --- Countdown timer ---
const countdown = document.getElementById('countdown');
var weddingDate = new Date('Jan 15, 2026 13:30:00').getTime();

setInterval(() => {
  var currentDate = new Date().getTime();
  var timeToWeddingDate = weddingDate - currentDate;

  var months = Math.floor((timeToWeddingDate % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
  var days = Math.floor((timeToWeddingDate % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeToWeddingDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (timeToWeddingDate < 0) {
    countdown.innerHTML = "The big day has arrived!";
  } else {
    countdown.innerHTML = `${months} Months ${days} Days ${hours} Hours until we say I do!`;
  }
}, 1000);

// Render URL
const API_BASE = "https://wedding-bells-backend.onrender.com"
//const LOCAL_API = "http://localhost:5000"; //for local testing

// RSVP Submission
document.getElementById("rsvpBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const attending = document.getElementById("attending").value;
  const plusOne = document.getElementById("plusOne").value;

  if (!name || !attending || !plusOne) {
    alert("Please fill in all fields.");
    return;
  }

  try{
    const response = await fetch(`${API_BASE}/api/rsvp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, attending, plusOne }), 
  });
    if(!response.ok){
      throw new Error("Failed to submit RSVP");
    }
    const result = await response.json();
    alert("RSVP saved successfully!"); 
  }catch(err){
    console.error(err);
    alert("There was a problem submitting your RSVP. Please try again later.");
  }
});

// Song Suggestion Submission
document.getElementById("suggestionBtn").addEventListener("click", async () => {
  const song = document.getElementById("songName").value;
  const artist = document.getElementById("artistName").value;

  if (!song || !artist) {
    alert("Please fill in both fields.");
    return;
  }
  try{
    const response = await fetch(`${LOCAL_API}/api/songs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ song, artist }),
  });
  if(!response.ok){
    throw new Error("Failed to submit song suggestion");
  }
  const result = await response.json();
  alert("Song suggestion saved successfully!");
  }catch(err){
    console.error(err);
    alert("There was a problem submitting your song suggestion. Please try again later.");
  }
});