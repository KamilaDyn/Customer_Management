import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Button, Card, ListGroup } from "react-bootstrap";
class CustomerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: ""
    };
  }
  componentDidMount() {
    this.getCustomer();
  }
  getCustomer() {
    const {
      match: { params }
    } = this.props;

    axios
      .get(`/api/items/${params.id}`)
      // .then(response => console.log(response));
      .then(response => {
        // console.log(response);
        this.setState({ details: response.data }, () => {
          // console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  onDelete() {
    const contactId = this.state.details._id;
    axios
      .delete(`/api/items/${contactId}`)
      .then(response => {
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  }

  render() {
    const {
      _id,
      first_name,
      second_name,
      email,
      mobile_phone,
      work_phone,
      shipping_street,
      shipping_number,
      shipping_zipcode,
      shipping_city,
      shipping_country,
      billing_street,
      billing_number,
      billing_zipcode,
      billing_city,
      billing_country
    } = this.state.details;
    this.onDelete = this.onDelete.bind(this);
    return (
      <Container className="mb-5">
        <Link className="btn bg-secondary text-white my-5" to="/">
          Back
        </Link>
        <Link
          className="btn bg-primary text-white my-5 ml-5"
          to={`/items/edit/${_id}`}
        >
          Edit
        </Link>
        <Card>
          <Card.Header>
            <h2 className="text-primary text-center">
              <Link to={`/items/edit/${_id}`}>
                <i className="fas fa-user-edit mr-5" />
              </Link>
              {second_name} {first_name}
            </h2>
          </Card.Header>
          <ListGroup>
            <ListGroup.Item>
              <i className="fas fa-envelope mr-2" />
              <strong>Email: </strong>
              {email}
            </ListGroup.Item>
            <ListGroup.Item>
              <i className="fas fa-mobile-alt mr-2" />
              <strong>1st Phone: </strong> {mobile_phone}
            </ListGroup.Item>
            <ListGroup.Item>
              <i className="fas fa-phone-volume mr-2" />
              <strong>2nd Phone: </strong>
              {work_phone}
            </ListGroup.Item>
            <ListGroup.Item>
              <h5 className="my-1 text-center text-secondary">
                Delivery Address
              </h5>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup.Item>
            <strong>Street: </strong>
            {shipping_street}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Number: </strong>
            {shipping_number}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Zipcode: </strong>
            {shipping_zipcode}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>City: </strong>
            {shipping_city}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Country: </strong>
            {shipping_country}
          </ListGroup.Item>
          <ListGroup.Item>
            <h5 className="my-1 text-center text-secondary">Billing Address</h5>
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Street: </strong>
            {billing_street}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Number: </strong>
            {billing_number}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Zipcode: </strong>
            {billing_zipcode}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>City: </strong>
            {billing_city}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Country: </strong>
            {billing_country}
          </ListGroup.Item>
          <Card.Body />
          <Button
            variant="danger"
            onClick={e => {
              if (
                window.confirm("Are you sure, you want to delete this contact")
              ) {
                this.onDelete(e);
              }
            }}
          >
            Delete
          </Button>
        </Card>
      </Container>
    );
  }
}
export default CustomerDetails;
