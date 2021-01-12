import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

/*
 * This function allows me to connect to a backend instance of
 * _where_ conda store is running, allowing me to query the API
 */

const NavBar = (props: any) => {
  /*
   * Use this function to connect to the appropriate conda-store backend
   */
  return (
    <div>
      <Navbar collapseOnSelect expand={false} bg="dark" variant="dark">
        <Navbar.Brand onClick={ (e: any) => props.handleHome(e) }>Conda Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#features">Create Environment</Nav.Link>
            <Nav.Link href="#pricing">Settings</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets"> Connected to {props.server_name} </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
