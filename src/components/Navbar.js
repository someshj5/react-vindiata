import React from "react";

export default function Navbar({ title }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <a
              className="text-decoration-none no-underline"
              href={`${title.toLowerCase()}`}
            >
              {title}
            </a>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  href={`${title.toLowerCase()}`}
                  className="nav-link active"
                  aria-current="page"
                >
                  {title}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
