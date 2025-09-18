import React from 'react'

export default function Footer() {
  return (
    <div>
      <footer className="footer">
        <p>© {new Date().getFullYear()} JobTracker | All rights reserved.</p>
      </footer>
    </div>
  );
}
