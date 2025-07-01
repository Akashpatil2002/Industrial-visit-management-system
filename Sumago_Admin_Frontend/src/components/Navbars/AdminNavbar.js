import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import routes from "routes.js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Header() {
  const location = useLocation();
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  );

  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    history.push("/login");
  };

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container fluid>
        <div className="d-flex align-items-center">
          <Button
            variant="link"
            className="d-lg-none btn-icon rounded-circle p-2 me-2"
            onClick={mobileSidebarToggle}
            style={{
              width: "40px",
              height: "40px",
              transition: "all 0.3s ease",
              color: "#4e73df",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f8f9fa";
              e.currentTarget.style.transform = "rotate(90deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.transform = "rotate(0deg)";
            }}
          >
            <i className="fas fa-bars"></i>
          </Button>
          <Navbar.Brand
            href="#home"
            onClick={(e) => e.preventDefault()}
            className="mr-2 fw-bold"
            style={{
              color: "#2e3a4d",
              fontSize: "1.25rem",
            }}
          >
            {getBrandText()}
          </Navbar.Brand>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>

<<<<<<< HEAD
        <Navbar.Collapse id="basic-navbar-nav" style={{justifyContent: "end"}}>
=======
        <Navbar.Collapse id="basic-navbar-nav">
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
          <Nav className="ms-auto align-items-center">
            <Nav.Item>
              <Button
                variant="outline-primary"
                onClick={handleLogout}
                className="px-4 py-2"
                style={{
                  borderRadius: "8px",
                  // borderWidth: "2px",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#4e73df";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#4e73df";
                }}
              >
                <span className="position-relative z-index-1">
                  {isLoggedIn ? "Logout" : "Login"}
                </span>
                <span
                  className="position-absolute bg-primary"
                  style={{
                    top: "50%",
                    left: "50%",
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    transform: "translate(-50%, -50%)",
                    opacity: 0,
                    transition: "all 0.6s ease",
                  }}
                ></span>
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
