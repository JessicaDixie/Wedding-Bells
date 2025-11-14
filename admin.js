const API_URL = "https://wedding-bells-backend.onrender.com";

// Load RSVPs
async function loadRsvps() {
  const res = await fetch(`${API_URL}/api/rsvp`);
  const rsvps = await res.json();

  const table = document.querySelector("#rsvpTable tbody");
  table.innerHTML = "";

  rsvps.forEach(r => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${r.name}</td>
      <td>${r.attending}</td>
      <td>${r.plusOne}</td>
    `;
    table.appendChild(row);
  });
}

// Load Song Suggestions
async function loadSongs() {
  const res = await fetch(`${API_URL}/api/songs`);
  const songs = await res.json();

  const table = document.querySelector("#songTable tbody");
  table.innerHTML = "";

  songs.forEach(s => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${s.song}</td>
      <td>${s.artist}</td>
    `;
    table.appendChild(row);
  });
}

// Load everything when the page opens
loadRsvps();
loadSongs();
