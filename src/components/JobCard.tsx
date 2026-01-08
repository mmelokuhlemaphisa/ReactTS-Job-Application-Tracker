import { Link } from "react-router-dom";
import Button from "./button";

interface Job {
  id: string;
  userId: string;
  company: string;
  role: string;
  status: string;
  date: string;
  details: string;
}

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
}

export default function JobCard({ job, onEdit, onDelete }: JobCardProps) {
  return (
    <div className="job-card">
      <h2 className="job-company">{job.company}</h2>
      <p className="job-role">{job.role}</p>
      <span className={`status status-${job.status.toLowerCase()}`}>
        {job.status}
      </span>
      <p className="job-date">Date: {job.date}</p>
      <p className="job-details">{job.details}</p>
      <div className="job-actions">
        <Button variant="blue">
          <Link className="details" to={`/jobpage/${job.id}`}>
            Details
          </Link>
        </Button>
        <Button variant="blue" onClick={() => onEdit(job)}>
          Edit
        </Button>
        <Button variant="red" onClick={() => onDelete(job.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
}
