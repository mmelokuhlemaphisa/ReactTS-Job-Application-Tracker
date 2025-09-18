import React from 'react'

export default function Home() {
  return (
    <div>
      <div className="homepage">
        <nav className="navbar">
          <div className='head'>
            <img className="log" src="/src/assets/Logo-preview.jpg" alt="" />
            <h1>JobTacker</h1>
          </div>

          <div className="nav-buttons">
            <button className="btn btn-green">Add Job</button>
            <button className="btn btn-red">Logout</button>
          </div>
        </nav>

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
          <div className="job-card">
            <h2 className="job-company">Google</h2>
            <p className="job-role">Frontend Developer</p>
            <span className="status status-applied">Applied</span>
            <p className="job-date">Date: 2025-09-01</p>
            <div className="job-actions">
              <button className="btn btn-blue">Details</button>
              <button className="btn btn-green">Edit</button>
              <button className="btn btn-red">Delete</button>
            </div>
          </div>
        </div>
      </div>
      <footer>hhghhhh</footer>
    </div>
  );
}
