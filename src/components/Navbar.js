import { Button, Navbar } from "flowbite-react";
import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

export const AdminNavbar = () => {
  const location = useLocation();
  return (
    <Navbar fluid={true} rounded={true} className="border-b-2">
      <Navbar.Brand>
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Fibbo Admin
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/" active={location.pathname === "/"}>
          Home
        </Navbar.Link>
        <Navbar.Link
          href="/community"
          active={location.pathname === "/community"}
        >
          Community
        </Navbar.Link>
        <Navbar.Link href="/artists" active={location.pathname === "/artists"}>
          Artists
        </Navbar.Link>
        <Navbar.Link
          href="/gasStation"
          active={location.pathname === "/gasStation"}
        >
          Gas Station
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
