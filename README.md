
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

# Project Structure

JobTracker/
├─ public/
├─ src/
│  ├─ assets/         # Logo and images
│  ├─ components/     # React components
│  │  ├─ pages/       # Pages like Home, Login, Register, JobPage
│  └─ App.tsx         # Main App with Routes
├─ db.json             # JSON Server database
├─ package.json
└─ README.md


# Start JSON Server

* npx json-server --watch db.json --port 3000
* This will start a backend server at http://localhost:3000



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

* GitHub: 

* Email: melokuhlemaphisa99@gmail.com