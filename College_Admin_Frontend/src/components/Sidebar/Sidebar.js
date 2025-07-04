import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";
import logo from "assets/img/Group 13.png";

function Sidebar({ color, image, routes }) {
  const location = useLocation();

  const excludedItems = ["/login", "/register", "/resetpassword"];

  const filteredRoutes = routes.filter(
    (route) => !excludedItems.includes(route.path)
  );

  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-center">
          <a
            href="https://website.sumagotraining.in/"
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
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

export default Sidebar;
