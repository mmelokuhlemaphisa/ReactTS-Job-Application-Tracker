import React from 'react'
import { Link } from 'react-router';

export default function Landing() {
  return (
    <div>
    <div className="hearder">
        <img className="logo" src="/src/assets/Logo-preview.jpg" alt="" />
        <h1>JobTacker</h1>
      </div>

      <div className="heroSection">
        <div>
          <img className="heropic" src="/src/assets/heroPic.jpg" alt="" />
        </div>
        <div className="herotext">
          <h1>Welcome to Your Job Application Tracker!</h1>
          <p>
            Take control of your job search with ease. Our simple, intuitive app
            helps you organize all your applications, monitor your progress, and
            stay on top of deadlines — all in one place. Whether you’re applying
            for your first job or managing multiple opportunities, we make
            tracking effortless so you can focus on landing your dream role.
          </p>
        </div>
      </div>

      <div className="heroSection">
        <div className="herotext">
          <h2>
            Stay on Top of Every Opportunity – Track, Manage, and Organize Your
            Job Applications
          </h2>
          <p>
            Searching for a job can be overwhelming, but it doesn’t have to be.
            With our Job Tracker app, you can easily log every application, keep
            track of deadlines, monitor interview progress, and stay motivated
            throughout your career journey. Take control of your job search,
            reduce stress, and focus on landing your dream role with confidence.
          </p>
        </div>

        <div>
          <img className="heropic" src="/src/assets/Manage.jpg" alt="" />
        </div>
      </div>

      <div className="btn">
        <button className="button" type="submit">
          <Link className="link-a" to="/register">Get Started</Link>
        </button>
      </div>
    </div>
  );
}
