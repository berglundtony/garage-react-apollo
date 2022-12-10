import React from "react";
import { Link } from "react-router-dom";
import './header.css';

function NavLinks() {
    return (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link disabled" to="/addCar">
            Add Car
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/listCars">
            List Cars
          </Link>
        </li>
      </ul> 
    );
  }

  export function Header() {
    return (
      <header>
        <div className="container">
          <div className="logo col-md-5 col-sm-5 col-xs-8">
     
            <span className="text">MANIACALLY TAKING TECH TO THE GLOBE</span>
          </div>
          <div className="mobile-togle col-md-12 col-sm-12 col-xs-12">
            <nav className="navbar navbar-default" role="navigation">
              <div className="navbar-header">
                <button
                  type="button"
                  id="hamburger"
                  className="navbar-toggle x collapsed"
                  data-toggle="collapse"
                  data-target="#navbar-collapse-x"
                >
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <div className="navbar-brand"></div>
              </div>
  
              <div className="collapse navbar-collapse" id="navbar-collapse-x">
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <div className="search1">
                      <button type="submit">
                        <i className="fa fa-search"></i>
                      </button>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                      />
                    </div>
                  </li>
                  <NavLinks />
                </ul>
              </div>
            </nav>
          </div>
          </div>
          </header>
        )}