//============================================================
// IMAGE GALLERY ROTATION
//============================================================

//Array of filepaths for each image in the slideshow
const galleryImages = [
  "images/img1.png",
  "images/img2.png",
  "images/img3.png",
  "images/img4.png",
  "images/img5.png",
  "images/img6.jpg"
];

let currentIndex = 0; // Tracks the current starting index in the rotation 

const columns = document.querySelectorAll('.column img'); // All images within the three columns

// Rotates the images displayed in the columns. Each column shows an image offset from the currentIndex.
// Fade-out animation is applied before changing image sources.
function rotateImages() {
  for (let i = 0; i < columns.length; i++) {
    const imgIndex = (currentIndex + i) % galleryImages.length; // Determine which image in the gallery should show in this column
    columns[i].classList.add('fade-out'); //Trigger fade-out animation

    // Delay image change until fade-out animation is done
    setTimeout(() => {
      columns[i].src = galleryImages[imgIndex];
      columns[i].classList.remove('fade-out');
    }, 500);
  }
  currentIndex = (currentIndex + 3) % galleryImages.length; // Moves the index forward by 3 images for the next cycle
}

// Initial immages are displayed and then rotated every 10 seconds
rotateImages();
setInterval(rotateImages, 10000);


//============================================================
// COUNTDOWN TIMER
//============================================================

const countdown = document.getElementById('countdown'); // DOM element where countdown text will show
const weddingDate = new Date('2026-01-17T15:30:00'); // Wedding date and start time

// Updates the countdown every second and calculates the months, days, and hours remaining
function updateCountdown() {
  const now = new Date();

  // If the wedding date has passed display a message and stop updating the countdown
  if (now >= weddingDate) {
    countdown.textContent = "The big day has arrived!";
    return;
  }

  // Create date copies so we can adjust without affecting originals
  let start = new Date(now);
  let end = new Date(weddingDate);

  // Calculate full month difference
  let months = (end.getFullYear() - start.getFullYear()) * 12 +
               (end.getMonth() - start.getMonth());

  // If the current day is greater than the wedding's day of the month, reduce by one month
  if (start.getDate() > end.getDate()) {
    months -= 1;
  }

  // Advance start by the calculated month count
  const temp = new Date(start);
  temp.setMonth(temp.getMonth() + months);

  const diff = end - temp;   // Get the remaining time difference

  // Convert remaining time into days and hours
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  countdown.textContent = `${months} Months ${days} Days ${hours} Hours until we say I do!`;
}
// Begin the countdown immediately and update every second
setInterval(updateCountdown, 1000);
updateCountdown();

//const LOCAL_API = "http://localhost:5000"; // used for local testing


//============================================================
// RSVP FORM SUBMISSION
//============================================================

// Wehn the user clicks the "Submit RSVP" button, inputs are validated and a POST request is sent to the backend
document.getElementById("rsvpBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const attending = document.getElementById("attending").value;
  const plusOne = document.getElementById("plusOne").value;

  // Basic input validation
  if (!name || !attending || !plusOne) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    // Send RSVP data to backend RSVP API
    const response = await fetch(`https://wedding-bells-backend.onrender.com/api/rsvp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, attending, plusOne }),
    });
    if (!response.ok) {
      throw new Error("Failed to submit RSVP");
    }
    const result = await response.json();
    alert("RSVP saved successfully!");
    // Reset form fields to defaults
    document.getElementById("name").value = "";
    document.getElementById("attending").value = "yes";
    document.getElementById("plusOne").value = "yes";
  } catch (err) {
    console.error(err);
    alert("There was a problem submitting your RSVP. Please try again later.");
  }
});


//============================================================
// SONG SUGGESTION FORM SUBMISSION
//============================================================

// Wehn the user clicks the "Submit Suggestion" button, inputs are validated and a POST request is sent to the backend
document.getElementById("suggestionBtn").addEventListener("click", async () => {
  const song = document.getElementById("songName").value;
  const artist = document.getElementById("artistName").value;

  // Basic input validation
  if (!song || !artist) {
    alert("Please fill in both fields.");
    return;
  }
  try {
    // Send song suggestion data to backend API
    const response = await fetch(`https://wedding-bells-backend.onrender.com/api/songs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ song, artist }),
    });
    if (!response.ok) {
      throw new Error("Failed to submit song suggestion");
    }
    const result = await response.json();
    alert("Song suggestion saved successfully!");
    // Reset form fields to defaults
    document.getElementById("songName").value = "";
    document.getElementById("artistName").value = "";
  } catch (err) {
    console.error(err);
    alert("There was a problem submitting your song suggestion. Please try again later.");
  }
});