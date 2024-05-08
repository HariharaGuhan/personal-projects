import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import "./pages/nav.css";
import { Link } from "react-router-dom";
export default function Navuser() {
  {
    return (
      <>
        <div className="d-flex justify-content-center bg-dark nav1">
          <nav class="navbar navbar-expand-lg navbar-light bg-dark  sticky-top ">
            <div class="container-fluid">
              <a class="navbar-brand text-light" href="#">
                <FontAwesomeIcon icon={faApple} />
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
                  Mac
                  <li class="nav-item mar  ">
                    <a
                      class="nav-link active text-light "
                      aria-current="page"
                      href="#"
                    >
                      Store
                    </a>
                  </li>
                  <li class="nav-item mar">
                    <a class="nav-link text-light" href="#">
                      Mac
                    </a>
                  </li>
                  <li class="nav-item mar">
                    <a class="nav-link text-light" href="#" tabindex="-1">
                      iPhone
                    </a>
                  </li>
                  <li class="nav-item mar">
                    <a class="nav-link text-light" href="#" tabindex="-1">
                      watch
                    </a>
                  </li>
                  <li class="nav-item mar">
                    <a class="nav-link text-light" href="#">
                      Airpods
                    </a>
                  </li>
                  <li class="nav-item mar">
                    <a
                      class="nav-link text-light"
                      href="#"
                      tabindex="-1"
                      aria-disabled="true"
                    >
                      Entertainment
                    </a>
                  </li>
                  <li class="nav-item mar">
                    <a
                      class="nav-link text-light"
                      href="#"
                      tabindex="-1"
                      aria-disabled="true"
                    >
                      Specification
                    </a>
                  </li>
                  <div>
                    <a>
                      <button className="btn btn-info mar"><Link to="/up">Signup</Link></button>
                    </a>
                  </div>
                  <div>
                    <a>
                      <button className="btn btn-success mar">Login</button>
                    </a>
                  </div>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </>
    );
  }
}
