import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  Select,
  TextArea,
  JobCard,
  Modal,
  Navbar,
} from "../components/ui";

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

export default function Home({ currentUser }: HomeProps) {
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
  currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

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
        <Navbar
          variant="main"
          showAddButton={true}
          onAddJob={() => {
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
        />

        {/* Search / Filter / Sort Controls */}
        <div className="controls">
          <Input
            variant="control"
            type="text"
            placeholder="🔍 Search by company or role"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Select
            variant="control"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { value: "All", label: "All" },
              { value: "Applied", label: "Applied" },
              { value: "Interviewed", label: "Interviewed" },
              { value: "Rejected", label: "Rejected" },
            ]}
          />

          <Select
            variant="control"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={[
              { value: "date", label: "Sort by Date" },
              { value: "company", label: "Sort by Company" },
            ]}
          />
        </div>

        {/* Modal */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={editJobId !== null ? "Edit Job" : "Add New Job"}
        >
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="company"
              value={newJob.company}
              onChange={handleChange}
              placeholder="Company Name"
              required
            />
            <Input
              type="text"
              name="role"
              value={newJob.role}
              onChange={handleChange}
              placeholder="Role"
              required
            />
            <Select
              name="status"
              value={newJob.status}
              onChange={handleChange}
              variant="modal"
              options={[
                { value: "Applied", label: "Applied" },
                { value: "Interviewed", label: "Interviewed" },
                { value: "Rejected", label: "Rejected" },
              ]}
            />

            <Input
              type="date"
              name="date"
              value={newJob.date}
              onChange={handleChange}
              required
            />
            <TextArea
              name="details"
              value={newJob.details}
              onChange={handleChange}
              placeholder="Extra details"
              rows={4}
            />

            <div className="modal-buttons">
              <Button type="submit" variant="green">
                {editJobId !== null ? "Update Job" : "Save Job"}
              </Button>
              <Button
                type="button"
                variant="red"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>

        {/* Job List */}
        <div className="job-list">
          {filteredJobs.length === 0 ? (
            <div className="welcome-message-container">
              <div className="welcome-message">
                <h2>Welcome, {currentUser?.username}!</h2>
                <p>
                  Start by adding a new job using the <strong>Add Job</strong>{" "}
                  button above.
                </p>
              </div>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>

        <footer className="footer">
          <p>© {new Date().getFullYear()} JobTracker | All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
