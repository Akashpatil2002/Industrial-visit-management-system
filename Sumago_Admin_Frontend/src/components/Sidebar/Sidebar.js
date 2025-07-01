import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";
<<<<<<< HEAD
import logo from 'assets/img/Group 13.png';
=======
import logo from "assets/img/Group 13.png";
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4

function Sidebar({ color, image, routes }) {
  const location = useLocation();

<<<<<<< HEAD
  const excludedItems = ['/login','/register','/resetpassword'];

  const filteredRoutes = routes.filter(route => !excludedItems.includes(route.path));
=======
  const excludedItems = ["/login", "/register", "/resetpassword"];

  const filteredRoutes = routes.filter(
    (route) => !excludedItems.includes(route.path)
  );
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4

  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
<<<<<<< HEAD

=======
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
<<<<<<< HEAD
        style={{ backgroundImage: "url(" + image + ")" }}
=======
        style={{
          backgroundImage: "url(" + image + ")",
        }}
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-center">
          <a
            href="https://website.sumagotraining.in/"
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
<<<<<<< HEAD
              <img style={{ width: "100px" }} src={require("assets/img/SCOPE_white-removebg-preview.png")} alt="..." />
            </div>
          </a>
=======
              <img
                style={{ width: "100px" }}
                src={require("assets/img/SCOPE_white-removebg-preview.png")}
                alt="..."
              />
            </div>
          </a>
          {/* <div>
            <a className="simple-text" href="https://website.sumagotraining.in/">
              Sumago Infotech
            </a>
            </div> */}
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
        </div>
        <Nav>
          {filteredRoutes.map((prop, key) => {
            if (!prop.redirect)
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

<<<<<<< HEAD

=======
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
export default Sidebar;
