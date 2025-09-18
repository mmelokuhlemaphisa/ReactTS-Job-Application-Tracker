import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Job {
  id: number;
  company: string;
  role: string;
  status: string;
  date: string;
  details: string;
}

export default function JobPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`http://localhost:3000/jobs/${id}`);
        if (!response.ok) throw new Error("Job not found");
        const data = await response.json();
        setJob(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return <p className="loading">Loading job details...</p>;
  if (!job) return <p className="error">Job not found</p>;

  return (
    <div className="jobpage">
      {/* Header */}
      <nav className="navbar">
        <div className="head">
          <img className="log" src="/src/assets/Logo-preview.jpg" alt="logo" />
          <h1>JobTracker</h1>
        </div>
      </nav>

      {/* Content */}
      <div className="job-details-container">
        <button onClick={() => navigate(-1)} className="btn btn-red back-btn">
          ← Back
        </button>

        <div className="job-details-card">
          <h1 className="job-title">{job.company}</h1>
          <h2 className="job-role">{job.role}</h2>

          <div className="job-meta">
            <span className={`status status-${job.status.toLowerCase()}`}>
              {job.status}
            </span>
            <span className="job-date">📅 {job.date}</span>
          </div>

          <div className="job-description">
            <h3>Job Description</h3>
            <p>{job.details}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} JobTracker | All rights reserved.</p>
      </footer>
    </div>
  );
}
