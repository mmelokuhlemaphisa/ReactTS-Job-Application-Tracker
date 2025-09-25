import React from 'react'
import { Link } from 'react-router';

export default function Error() {
  return (
    <div className="Pic404">
      <h1>Oops! Page Not Found</h1>
      <img src="/src/assets/The-404-Page.jpg" alt="" />

      <div className="home-btn">
        <button className="go-home" type="submit">
          <Link className="link-a" to="/
          ">
            Go Home
          </Link>
        </button>
      </div>
    </div>
  );
}
