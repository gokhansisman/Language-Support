import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Input, Row, Container, Col } from 'react-bootstrap'
import ls from '../images/ls.png'
class Header extends React.Component {
   render() {
      return (

         <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Language Support</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="mr-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#link">Link</Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                     <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                     <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                     <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                     <NavDropdown.Divider />
                     <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                  </NavDropdown>
               </Nav>

               <img src={ls} style={{ width: '3.5rem', align: 'right' }} />

            </Navbar.Collapse>
         </Navbar>
      );
   }
}

export default Header;