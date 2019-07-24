import React, { Component } from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavLink,
  NavItem
} from "reactstrap";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="primary" light expand="md">
          <NavbarBrand className="expand-lg mr-auto text-white " href="/">
            <h2> Customer Management</h2>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse
            className="bg-primary"
            isOpen={this.state.isOpen}
            navbar
            style={{ zIndex: "1" }}
          >
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className=" text-white center" href="/items/add">
                  <h5> Add New</h5>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className=" text-white center m-0" href="/about">
                  <h5>About</h5>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
