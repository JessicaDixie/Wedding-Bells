//============================================================
// ADMIN LOGIC
//============================================================

// Opens the admin login modal when the user clicks the Admin link
function openAdminLogin() {
  document.getElementById("adminModal").style.display = "block";
}

// Handles the submission of the password
function submitAdminPassword() {
  const password = document.getElementById("adminPassword").value; //retrieve the entered password

  // Send the password to the backend for verification
  fetch("/api/admin-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  })
  .then(res => res.json())
  .then(data => {
    // If the password is correct, redirect to the admin panel. If incorrect, display an error message within the modal
    if (data.success) {
      window.location.href = "/admin.html";
    } else {
      document.getElementById("adminError").style.display = "block";
    }
  });
}

// Close modal if user clicks outside
window.onclick = function(event) {
  const modal = document.getElementById("adminModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};



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

const countdown = document.getElementById('countdown');
const weddingDate = new Date('2026-01-17T15:30:00');

function updateCountdown() {
        const now = new Date();
        let diff = weddingDate.getTime() - now.getTime(); // Finds the difference in milliseconds

        //Checks if the wedding day and time has passed and stops the countdown
        if (diff < 0) {
            countdown.textContent = "The big day has arrived!";
            return;
        }

        // Initial time difference calculation of years, months, days, hours, minutes, seconds
        // These values may be negative and, if they are, will need to be corrected
        let years = weddingDate.getFullYear() - now.getFullYear();
        let months = weddingDate.getMonth() - now.getMonth();
        let days = weddingDate.getDate() - now.getDate();
        let hours = weddingDate.getHours() - now.getHours();
        let minutes = weddingDate.getMinutes() - now.getMinutes();

        // Adjust for negative numbers, using borrowing logic to ensure readable calendar style display
        if (minutes < 0) {
            minutes += 60;
            hours--; // "borrows" an hour if the minutes value is negative
        }
        if (hours < 0) {
            hours += 24;
            days--; // "borrows" a day if the hours value is negative
        }
        if (days < 0) {
            // Calculate  number of days in the previous month
            const lastMonthDate = new Date(now.getFullYear(), now.getMonth(), 0);
            days += lastMonthDate.getDate();
            months--; // "borrows" days from the previous month if the days value is negative
        }
        if (months < 0) {
            months += 12;
            years--; // "borrows" a year uf the months value is negative
        }
        countdown.textContent = `${months} Months ${days} Days ${hours} Hours ${minutes} Minutes until we say I do!`;
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