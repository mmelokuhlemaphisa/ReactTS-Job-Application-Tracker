import React from 'react'
import { Link } from 'react-router';

export default function Landing() {
  return (
    <div>
      <div>
        {/* Header */}
        <div className="hearder">
          <img className="logo" src="/src/assets/Logo-preview.jpg" alt="Logo" />
          <h1>JobTracker</h1>
        </div>

        <div className="mySection">
          {/* Hero Section */}
          <div className="heroSection">
            <div className="hero-image">
              <img
                className="heropic"
                src="/src/assets/heroPic.jpg"
                alt="Hero"
              />
            </div>
            <div className="herotext">
              <h1>Welcome to Your Job Application Tracker!</h1>
              <p>
                Take control of your job search with ease. Our simple, intuitive
                app helps you organize all your applications, monitor your
                progress, and stay on top of deadlines — all in one place.
              </p>
            </div>
          </div>

          {/* Info Section */}
          <div className="Section">
            <div className="text">
              <h2>Stay on Top of Every Opportunity</h2>
              <p>
                Searching for a job can be overwhelming, but it doesn’t have to
                be. With our Job Tracker app, you can easily log every
                application, keep track of deadlines, monitor interview
                progress, and stay motivated throughout your career journey.
              </p>
            </div>
            <div className="section-image">
              <img
                className="heropic"
                src="/src/assets/Manage.jpg"
                alt="Manage"
              />
            </div>
          </div>

          {/* CTA Button */}
          <div className="btn">
            <button className="but" type="submit">
              <Link className="link-a" to="/register">
                Get Started
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
