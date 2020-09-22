import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

/*
 * This function allows me to connect to a backend instance of
 * _where_ conda store is running, allowing me to query the API
 */

const NavBar = () => {

/*
 * Use this function to connect to the appropriate conda-store backend
 */

		return(
	<div>
<Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">Conda-Store</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
	      <Nav.Link href="#link">Create Environment</Nav.Link>
	      <Nav.Link href="#kernel">Manage Kernels</Nav.Link>
      <NavDropdown title="Server" id="basic-nav-dropdown">
	<NavDropdown.Item href="#action/3.1" onClick={ () => { }}>Localhost</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4" onClick={ () => { }}>Add More</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
  </Navbar>
  </div>
	);
};

export default NavBar
