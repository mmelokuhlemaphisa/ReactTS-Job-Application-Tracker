import React, { useState } from "react";
import { Link } from "react-router";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [jobs, setJobs] = useState([
    {
      id: 1,
      company: "Google",
      role: "Frontend Developer",
      status: "Applied",
      date: "2025-09-01",
      details: "Developed UI components using React.",
    },
  ]);

  const [newJob, setNewJob] = useState({
    company: "",
    role: "",
    status: "Applied",
    date: "",
    details: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newJob.company || !newJob.role || !newJob.date) {
      alert("Please fill in all required fields");
      return;
    }

    setJobs([...jobs, { ...newJob, id: Date.now() }]);
    setShowModal(false);
    setNewJob({
      company: "",
      role: "",
      status: "Applied",
      date: "",
      details: "",
    });
  };

  return (
    <div>
      <div className="homepage">
        <nav className="navbar">
          <div className="head">
            <img className="log" src="/src/assets/Logo-preview.jpg" alt="" />
            <h1>JobTacker</h1>
          </div>

          <div className="nav-buttons">
            <button
              className="btn btn-green"
              onClick={() => setShowModal(true)}
            >
              Add Job
            </button>
            <Link to="/" className="link-logout">
              <button className="btn btn-red">Logout</button>
            </Link>
          </div>
        </nav>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Add New Job</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="company"
                  value={newJob.company}
                  onChange={handleChange}
                  placeholder="Company Name"
                  required
                />
                <input
                  type="text"
                  name="role"
                  value={newJob.role}
                  onChange={handleChange}
                  placeholder="Role"
                  required
                />
                <select
                  name="status"
                  value={newJob.status}
                  onChange={handleChange}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interviewed">Interviewed</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <input
                  type="date"
                  name="date"
                  value={newJob.date}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="details"
                  value={newJob.details}
                  onChange={handleChange}
                  placeholder="Extra details about job and company"
                  rows={4}
                />
                <div className="modal-buttons">
                  <button type="submit" className="btn btn-green">
                    Save Job
                  </button>
                  <button
                    type="button"
                    className="btn btn-red"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="filters">
          <input
            type="text"
            placeholder="Search by company or role..."
            className="search-input"
          />
          <select className="select">
            <option value="">Filter by Status</option>
            <option value="Applied">Applied</option>
            <option value="Interviewed">Interviewed</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select className="select">
            <option value="asc">Sort by Date (Asc)</option>
            <option value="desc">Sort by Date (Desc)</option>
          </select>
        </div>

        <div className="job-list">
          {jobs.map((job) => (
            <div key={job.id} className="job-card">
              <h2 className="job-company">{job.company}</h2>
              <p className="job-role">{job.role}</p>
              <span className={`status status-${job.status.toLowerCase()}`}>
                {job.status}
              </span>
              <p className="job-date">Date: {job.date}</p>
              <p className="job-details">{job.details}</p>
              <div className="job-actions">
                <button className="btn btn-blue">Details</button>
                <button className="btn btn-green">Edit</button>
                <button className="btn btn-red">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer>hhghhhh</footer>
    </div>
  );
}
