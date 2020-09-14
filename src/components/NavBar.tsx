import React, { useState } from 'react';
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
const [envdata, setEnvdata] = useState(null);

async function getEnvData() {
	const response = await fetch('http://localhost:5001/api/v1/environment/')
	const jsondata = await response.json();
	setEnvdata(jsondata);
}	

function mapEnvironments(): void {
	console.log('hello' + JSON.stringify(envdata));

}
	return(
	<div>
<Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">Conda-Store</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
	      <Nav.Link href="#link">Create Environment</Nav.Link>
	      <Nav.Link href="#kernel">Manage Kernels</Nav.Link>
      <NavDropdown title="Server" id="basic-nav-dropdown">
	<NavDropdown.Item href="#action/3.1" onClick={ () => { getEnvData() }}>Localhost</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4" onClick={ () => { mapEnvironments() }}>Add More</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
  </Navbar>
  </div>
	);
};

export default NavBar
