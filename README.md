# Wedding-Bells
DLBCSPJWD01 Project

🎉Inge & Mark’s Wedding Website — Frontend

This repository contains the frontend for the wedding website of Inge and Mark.
It is designed as a lightweight static site hosted on GitHub Pages, providing guests with essential wedding details and the ability to submit their RSVPs and song suggestions.



🌐 Live Website

The site is deployed via GitHub Pages and accessible at:
➡️ https://jessicadixie.github.io/Wedding-Bells/



📁 Repository Structure

Wedding-Bells/

    ├──images          # Gallery photos
    ├──index.html      # Main public wedding page
    ├──script.js       # Main frontend logic (Photo gallery, RSVP, songs, countdown)
    ├──styles.css      # Styles for the main site
    ├──README.md      
    ├──LICENSE   
    └──.gitignore
    
Note: The frontend doesn't contain any admin files (such as admin.html, admin.css, or admin.js). The admin dashboard is now served exclusively from the backend for security reasons.



🚀 Features

👰 Main Wedding Page (index.html)
- Wedding invitation header
- Admin Login modal (where the couple or developer can enter the admin password. The password is verified by the backend, which sets a secure authentication cookie)
  * Selecting it opens a password prompt. Upon successful authentication, the user is redirected to the admin page, which loads data from the backend via protected API requests.
  * Note: The admin password is configured in the backend and is not stored in or exposed by the frontend.
- Three-image gallery with timed transitions
- Countdown timer to the wedding date
- Wedding itinerary timeline
- RSVP form (Name, Attending status, +1 option)
- Song suggestion form (Song, Artist)
- All submissions are sent to the backend (hosted separately on Render).


🛠️ Installation & Usage (GitHub Pages)

This project is entirely static, so no build steps are required.

1. Clone the repository:
   
        git clone https://github.com/JessicaDixie/Wedding-Bells.git

2. Enable GitHub Pages
    1) Go to the GitHub repository.
    2) Navigate to Settings → Pages.
    3) Under Build and Deployment, set:
        - Source: Deploy from branch
        - Branch: main
        - Folder: / (root)
    4) Save.
   
GitHub Pages will automatically publish the website.



🔄 Updating the Website

Any changes pushed to main will automatically redeploy to GitHub Pages within a few seconds:

    git add .
    git commit -m "Update UI or logic"
    git push origin main



📌 Important Notes
- Backend integration
  * The frontend communicates with the backend (hosted on Render) using HTTPS requests. All requests to admin endpoints must include:
    
            credentials: "include"
    This allows the backend to verify the user's admin authentication cookie
- This repository contains only the frontend.
- No admin files are hosted in this repository.
- The backend API (Node.js + Express + MongoDB) is hosted separately on Render.
- The admin dashboard is protected on the backend using:
  * A password check
  * A secure, HTTP-only cookie
  * A protected /admin route
- Ensure CORS is properly configured on the backend for GitHub Pages.



📜 License

This project is licensed under the terms of the MIT License.
