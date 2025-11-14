//Array of file strings that stores the filepaths to each image
const galleryImages = [
  "images/img1.png",
  "images/img2.png",
  "images/img3.png",
  "images/img4.png",
  "images/img5.png",
  "images/img6.jpg"
];

//Image rotation
let currentIndex = 0;
const columns = document.querySelectorAll('.column img');

function rotateImages() {
  for (let i = 0; i < columns.length; i++) {
    const imgIndex = (currentIndex + i) % galleryImages.length;
    columns[i].classList.add('fade-out');

    // Delay change until fade animation is done
    setTimeout(() => {
      columns[i].src = galleryImages[imgIndex];
      columns[i].classList.remove('fade-out');
    }, 500);
  }
  currentIndex = (currentIndex + 3) % galleryImages.length;
}

// Initial immages are displayed and then rotated every 10 seconds
rotateImages();
setInterval(rotateImages, 10000);

//Countdown timer
const countdown = document.getElementById('countdown');
const weddingDate = new Date('2026-01-17T13:30:00');

function updateCountdown() {
  const now = new Date();

  if (now >= weddingDate) {
    countdown.textContent = "The big day has arrived!";
    return;
  }

  // Create copies so we can adjust without affecting originals
  let start = new Date(now);
  let end = new Date(weddingDate);

  // Calculate months difference
  let months = (end.getFullYear() - start.getFullYear()) * 12 +
               (end.getMonth() - start.getMonth());

  // If the current day is greater than the wedding day, reduce one month
  if (start.getDate() > end.getDate()) {
    months -= 1;
  }

  // Advance start by the computed months
  const temp = new Date(start);
  temp.setMonth(temp.getMonth() + months);

  // Get the remaining milliseconds
  const diff = end - temp;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  countdown.textContent = `${months} Months ${days} Days ${hours} Hours until we say I do!`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

//const LOCAL_API = "http://localhost:5000"; //used for local testing

// RSVP Submission
document.getElementById("rsvpBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const attending = document.getElementById("attending").value;
  const plusOne = document.getElementById("plusOne").value;

  if (!name || !attending || !plusOne) {
    alert("Please fill in all fields.");
    return;
  }

  try {
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
    //clear RSVP input fields
    document.getElementById("name").value = "";
    document.getElementById("attending").value = "yes";
    document.getElementById("plusOne").value = "yes";
  } catch (err) {
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
  try {
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
    //clear song title and artist fields
    document.getElementById("songName").value = "";
    document.getElementById("artistName").value = "";
  } catch (err) {
    console.error(err);
    alert("There was a problem submitting your song suggestion. Please try again later.");
  }
});