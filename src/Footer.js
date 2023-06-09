import React from "react";
import { Link } from "react-router-dom";
import './footer.css';

export function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="main-footer col-lg-12 col-md-12 col-xs-12">
          <div className="links">
            <ul className="quick-links col-lg-10 col-md-10 col-xs-6">
              <li>
                <Link to="/listCars">Cars</Link>
              </li>
              <li>
                <Link to="/addCar">Add Car</Link>
              </li>
              <li>
                <Link to="/searchCar">Find a car</Link>
              </li>
              <li>
                <Link to="/editCar">Editcar</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="video-sec col-md-4 col-sm-12 col-xs-12">
        <h1 className="video-heading text-center">
          <img src="images/pluralsight-white.png" alt="" />
        </h1>
        <span className="border"></span>
        <p className="footer-p">
          This site is created for demonstrative purposes only and does not
          offer any real products or services.
        </p>
        <p></p>
      </div>
    </footer>
  );
}