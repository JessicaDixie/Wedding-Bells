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

