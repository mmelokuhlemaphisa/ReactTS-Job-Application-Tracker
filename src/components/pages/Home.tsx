import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Job {
  id: string;
  userId: string;
  company: string;
  role: string;
  status: string;
  date: string;
  details: string;
}

interface User {
  id: string;
  username: string;

}

interface HomeProps {
  currentUser: User | null;
}

export default function Home({currentUser}:HomeProps)  {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editJobId, setEditJobId] = useState<string | null>(null);
  const [newJob, setNewJob] = useState<Omit<Job, "id" | "userId">>({
    company: "",
    role: "",
    status: "Applied",
    date: "",
    details: "",
  });

  const navigate = useNavigate();

  // ✅ Get currentUser from localStorage
  currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

 const filterByUserId = (jobs: Job[], userId: string): Job[] => {
   return jobs.filter((job) => job.userId === userId);
 };

  useEffect(() => {
    if (!currentUser) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    const fetchJobs = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/jobs?userId=${currentUser.id}`
        );
        const data: Job[] = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, [currentUser, navigate]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newJob.company || !newJob.role || !newJob.date) {
      alert("Please fill in all required fields");
      return;
    }

    if (!currentUser) return;

    try {
      if (editJobId !== null) {
        // Update existing job
        await fetch(`http://localhost:3000/jobs/${editJobId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...newJob,
            id: editJobId,
            userId: currentUser.id,
          }),
        });

        setJobs(
          jobs.map((job) =>
            job.id === editJobId
              ? { ...job, ...newJob, id: editJobId, userId: currentUser.id }
              : job
          )
        );

        setEditJobId(null);
      } else {
        // Create new job
        const res = await fetch("http://localhost:3000/jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...newJob, userId: currentUser.id }),
        });

        const savedJob: Job = await res.json();
        setJobs([...jobs, savedJob]);
      }

      setShowModal(false);
      setNewJob({
        company: "",
        role: "",
        status: "Applied",
        date: "",
        details: "",
      });
    } catch (err) {
      console.error("Error saving job:", err);
      alert("Failed to save job");
    }
  };

  const handleEdit = (job: Job) => {
    setNewJob({
      company: job.company,
      role: job.role,
      status: job.status,
      date: job.date,
      details: job.details,
    });
    setEditJobId(job.id);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!currentUser) return;

    if (window.confirm("Are you sure you want to delete this job?")) {
      await fetch(`http://localhost:3000/jobs/${id}`, { method: "DELETE" });
      setJobs(jobs.filter((job) => job.id !== id));
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  const filteredJobs = jobs
    .filter((job) =>
      `${job.company} ${job.role}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter((job) =>
      filterStatus === "All" ? true : job.status === filterStatus
    )
    .sort((a, b) =>
      sortBy === "date"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : a.company.localeCompare(b.company)
    );

  if (!currentUser) return null;

  return (
    <div>
      <div className="homepage">
        <nav className="navbar">
          <div className="head">
            <img className="log" src="/src/assets/Logo-preview.jpg" alt="" />
            <h1>JobTracker</h1>
          </div>

          <div className="nav-buttons">
            <button
              className="btn btn-green"
              onClick={() => {
                setShowModal(true);
                setEditJobId(null);
                setNewJob({
                  company: "",
                  role: "",
                  status: "Applied",
                  date: "",
                  details: "",
                });
              }}
            >
              Add Job
            </button>
            <Link to="/" className="link-logout">
              <button className="btn btn-red">Logout</button>
            </Link>
          </div>
        </nav>

        {/* Search / Filter / Sort Controls */}
        <div className="controls">
          <input
            type="text"
            className="control-input"
            placeholder="🔍 Search by company or role"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="control-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Applied">Applied</option>
            <option value="Interviewed">Interviewed</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            className="control-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="company">Sort by Company</option>
          </select>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>{editJobId !== null ? "Edit Job" : "Add New Job"}</h2>
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
                  className="filters"
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
                  placeholder="Extra details"
                  rows={4}
                />

                <div className="modal-buttons">
                  <button type="submit" className="btn btn-green">
                    {editJobId !== null ? "Update Job" : "Save Job"}
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

        {/* Job List */}
        <div className="job-list">
          {filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              <h2 className="job-company">{job.company}</h2>
              <p className="job-role">{job.role}</p>
              <span className={`status status-${job.status.toLowerCase()}`}>
                {job.status}
              </span>
              <p className="job-date">Date: {job.date}</p>
              <p className="job-details">{job.details}</p>

              <div className="job-actions">
                <button className="btn btn-blue">
                  <Link to={`/jobpage/${job.id}`}>Details</Link>
                </button>

                <button
                  className="btn btn-blue"
                  onClick={() => handleEdit(job)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-red"
                  onClick={() => handleDelete(job.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <p>© {new Date().getFullYear()} JobTracker | All rights reserved.</p>
      </footer>
    </div>
  );
}
