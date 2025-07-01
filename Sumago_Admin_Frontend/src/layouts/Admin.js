<<<<<<< HEAD
import React, { useState, useEffect, useRef } from "react";
import { useLocation, Route, Switch, useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

=======
import React, { useState, useEffect, useRef,Component } from "react";
import { useLocation, Route, Switch,useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";
<<<<<<< HEAD
import sidebarImage from "assets/img/Group 6.png";

function Admin() {
  const [image, setImage] = useState(sidebarImage);
  const [color, setColor] = useState("black");
  const [hasImage, setHasImage] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const mainPanel = useRef(null);

=======

import sidebarImage from "assets/img/Group 6.png";

function Admin() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const mainPanel = React.useRef(null);
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
<<<<<<< HEAD

=======
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);

  useEffect(() => {
<<<<<<< HEAD
=======
    // Check authentication status on location change
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
    if (!localStorage.getItem("authToken") && location.pathname !== "/admin/login" && location.pathname !== "/admin/register" && location.pathname !== "/admin/resetpassword") {
      setShowModal(true);
    }
  }, [location]);

  const pathsToHideSidebarAndNavbarAndFooter = [
    "/admin/login",
    "/admin/register",
    "/admin/resetpassword"
  ];

  const hideSidebarAndNavbarAndFooter = !pathsToHideSidebarAndNavbarAndFooter.includes(location.pathname);

  const handleClose = () => {
    setShowModal(false);
    history.push("/admin/login"); // Redirect to login page
  };

<<<<<<< HEAD
=======

>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
  return (
    <>
      <div className={`wrapper ${hideSidebarAndNavbarAndFooter ? '' : 'full-page'}`}>
        {hideSidebarAndNavbarAndFooter && <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />}
        <div className={`main-panel ${hideSidebarAndNavbarAndFooter ? '' : 'full-width'}`} ref={mainPanel}>
          {hideSidebarAndNavbarAndFooter && <AdminNavbar />}
          <div className="content">
            <Switch>{getRoutes(routes)}</Switch>
          </div>
          {hideSidebarAndNavbarAndFooter && <Footer />}
        </div>
      </div>
      {/* <FixedPlugin
        hasImage={hasImage}
        setHasImage={() => setHasImage(!hasImage)}
        color={color}
        setColor={(color) => setColor(color)}
        image={image}
        setImage={(image) => setImage(image)}
      /> */}
      <Modal show={showModal}  onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Session Expired</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You need to log in to access the admin panel.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Go to Login
          </Button>
        </Modal.Footer>
      </Modal>
<<<<<<< HEAD
    </>
=======
      </>
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
  );
}

export default Admin;
