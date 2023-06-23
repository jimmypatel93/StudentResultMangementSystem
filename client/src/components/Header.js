import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="md"
      bg="primary"
      variant="dark"
      className="flex-column navbar-container"
    >
      <Nav className="w-100 d-inline-block justify-content-between align-items-start">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Link className="navbar-brand" to={'/'}>
          Student Result Management
        </Link>
      </Nav>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="flex-column">
          <Link to={'/'} className="nav-link">
            Home
          </Link>
          <Link to={'/add-students'} className="nav-link">
            Add New Students
          </Link>
          <Link to={'/students'} className="nav-link">
            Students List
          </Link>
          <Link to={'/add-courses'} className="nav-link">
            Add New Courses
          </Link>
          <Link to={'/courses'} className="nav-link">
            Courses List
          </Link>
          <Link to={'/add-results'} className="nav-link">
            Add New Results
          </Link>
          <Link to={'/results'} className="nav-link">
            Results List
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
