# Wedding-Bells
DLBCSPJWD01 Project

🎉Inge & Mark’s Wedding Website — Frontend

This repository contains the frontend for the wedding website of Inge and Mark.
It is designed as a lightweight static site hosted on GitHub Pages, providing guests with essential wedding details such as:
-Event itinerary
-Live countdown
-RSVP submission
-Song suggestion feature
-Additionally, for aesthetics, there is a photo gallery with a slideshow of the couple 



🌐 Live Website

The site is deployed via GitHub Pages and accessible at:
➡️ https://jessicadixie.github.io/Wedding-Bells/



📁 Repository Structure

Wedding-Bells/
├── images/         # Gallery photos
├── admin.css       # Styles for the admin page
├── admin.html      # Admin page (loaded after password validation)
├── admin.js        # Admin page logic (fetch RSVPs & songs)
├── index.html      # Main public wedding page
├── script.js       # Main frontend logic (Photo gallery, RSVP, songs, countdown)
├── styles.css      # Styles for the main site
├── README.md       
├── LICENSE         
└── .gitignore



🚀 Features

👰 Main Wedding Page (index.html)
-Wedding invitation header
-Admin section top right corner of the website
    ~Selecting it opens a password prompt. Upon successful authentication, the user is redirected to the admin page, which loads data from the backend via protected API requests.
    ~Note: The admin password is configured in the backend and is not stored in or exposed by the frontend.
-Three-image gallery with timed transitions
-Countdown timer to the wedding date
-Wedding itinerary timeline
-RSVP form (Name, Attending status, +1 option)
-Song suggestion form
-All submissions are sent to the backend (hosted separately on Render).


🔐 Admin Page (admin.html)
-Accessible only after entering the correct password.
-Displays:
    ~Table of all RSVPs
    ~Table of all song suggestions



🛠️ Installation & Usage (GitHub Pages)

This project is entirely static, so no build steps are required.

1. Fork or clone the repository:
git clone https://github.com/JessicaDixie/Wedding-Bells.git

2. Enable GitHub Pages
    1) Go to the GitHub repository.
    2) Navigate to Settings → Pages.
    3) Under Build and Deployment, set:
        -Source: Deploy from branch
        -Branch: main
        -Folder: / (root)
    4) Save.
GitHub Pages will automatically publish the website.



🔄 Updating the Website

Any changes pushed to main will automatically redeploy to GitHub Pages within a few seconds:
    git add .
    git commit -m "Update UI or logic"
    git push origin main



📌 Important Notes

-This repository contains only the frontend.
-The backend API (Node.js + Express + MongoDB) must be hosted separately, e.g., Render.
-API URLs inside script.js and admin.js must point to your Render backend.
-Ensure CORS is properly configured on your backend for GitHub Pages.



📜 License

This project is licensed under the terms of the MIT License.