import React, { Component } from "react";
import axios from "axios";
import CustomerItem from "./CustomerItem";
import {
  Card,
  Button,
  Container,
  InputGroup,
  FormControl
} from "react-bootstrap";

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      search: ""
    };
  }

  componentDidMount() {
    this.getCustomers();
  }

  getCustomers() {
    axios
      .get(`/api/items`)
      // .then(response => console.log(response));
      .then(response => {
        this.setState({ customers: response.data }, () => {});
      })
      .catch(error => console.log(error));
  }
  updateSearch(e) {
    this.setState({ search: e.target.value.substr(0, 20) });
  }
  render() {
    let filteredCustomers = this.state.customers.filter(item => {
      return (
        item.second_name
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
      );
    });
    const customerItems = filteredCustomers.map((item, i) => {
      return <CustomerItem key={item._id} item={item} />;
    });
    return (
      <Container className="my-3">
        <Button href="/items/add" variant="primary">
          <i className="fa fa-user-plus mr-3" />
          Add new Customer
        </Button>
        <div>
          <InputGroup className="my-3">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <i className="fa fa-search" />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Searching by last name"
              onChange={this.updateSearch.bind(this)}
              value={this.state.search}
            />
          </InputGroup>
        </div>
        <Card className="mt-5">
          <Card.Header>
            <h1>Customer List</h1>
          </Card.Header>
          <Card.Body>{customerItems}</Card.Body>
        </Card>
      </Container>
    );
  }
}

export default Customers;
