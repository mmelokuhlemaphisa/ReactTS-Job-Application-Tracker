<img src="https://socialify.git.ci/mmelokuhlemaphisa/ReactTS-Job-Application-Tracker/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="ReactTS-Job-Application-Tracker" width="640" height="320" />


# Project Description

JobTracker is a React-based web application designed to help users track their job applications efficiently. Users can register, log in, and manage their job applications by adding, editing, deleting, and viewing detailed job information. Each user can see only their own jobs.

 * Key features:

* User authentication (Login/Register).

* Add, edit, delete, and view job applications.

* Filter, search, and sort jobs.

* Responsive design with modals for adding/editing jobs.

* JSON Server backend for persistent data storage.

# Technologies Used

* Frontend: React, TypeScript, CSS

* Backend: JSON Server

* Routing: React Router

* State Management: React useState & useEffect

* Storage: LocalStorage for current user session

# Installation (Frontend)

1. Clone the repository
2. Navigate to the project folder
3. Run `npm install`
4. Run `npm run dev`
5. Open http://localhost:5174 in your browser



# JSON Server hosted links

* https://job-tracker-api-jze2.onrender.com/users
* https://job-tracker-api-jze2.onrender.com/jobs



# Usage

* Open the app in your browser.

* Register a new user or log in with an existing account.

* Add new jobs by clicking Add Job.

* Edit or delete jobs using the corresponding buttons.

* Click Details to view full job information.

* Use search, filter, and sort controls to manage your job list efficiently.

# Notes

* Each user can only see their own jobs.

* Passwords are stored in plain text in db.json for simplicity (not recommended for production).

* LocalStorage is used to store the currently logged-in user.

# Future Improvements

* Integrate a proper backend with authentication (JWT).

* Add file attachments or resume uploads.

* Implement password hashing for security.

* Add notifications or email reminders for interviews.

# Author

**Melokuhle Maphisa**

* GitHub: https://github.com/mmelokuhlemaphisa

* Email: melokuhlemaphisa99@gmail.com
