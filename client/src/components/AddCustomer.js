import React, { Component } from "react";
import { Form, Button, Col, Container, Card, Row } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      isChecked: false
    };
    this.handleCheck = this.handleCheck.bind(this);
  }

  addCustomer(newCustomer) {
    axios
      .request({
        method: "post",
        url: `http://localhost:5000/api/items`,
        data: newCustomer
      })
      .then(response => console.log(response.data))
      .then(response => this.props.history.push("/"))
      .catch(err => console.log(err));
  }

  handleSubmit(e) {
    const form = e.currentTarget;
    const newCustomer = {
      first_name: this.refs.first_name.value,
      second_name: this.refs.second_name.value,
      mobile_phone: this.refs.mobile_phone.value,
      work_phone: this.refs.work_phone.value,
      email: this.refs.email.value,
      shipping_street: this.refs.shipping_street.value,
      shipping_number: this.refs.shipping_number.value,
      shipping_zipcode: this.refs.shipping_zipcode.value,
      shipping_city: this.refs.shipping_city.value,
      shipping_country: this.refs.shipping_country.value,
      billing_street: this.refs.billing_street.value,
      billing_number: this.refs.billing_number.value,
      billing_zipcode: this.refs.billing_zipcode.value,
      billing_city: this.refs.billing_city.value,
      billing_country: this.refs.billing_country.value
    };

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      alert("Form has erros");
    } else {
      this.addCustomer(newCustomer);
      alert("Form submitted");
    }
    e.preventDefault();
    this.setState({ validated: true });
  }
  handleCheck() {
    this.setState({ isChecked: !this.state.isChecked });
    if (!this.state.isChecked) {
      $("#checked").change(function() {
        $("#billing_street").val($("#shipping_street").val());
        $("#billing_number").val($("#shipping_number").val());
        $("#billing_zipcode").val($("#shipping_zipcode").val());
        $("#billing_city").val($("#shipping_city").val());
        $("#billing_country").val($("#shipping_country").val());
      });
    } else {
      $("#checked").change(function() {
        $("#billing_street").val("");
        $("#billing_number").val("");
        $("#billing_zipcode").val("");
        $("#billing_city").val("");
        $("#billing_country").val("");
      });
    }
  }

  render() {
    const { validated } = this.state;
    return (
      <Container className="my-5">
        <Button href="/" variant="dark" className="my-3">
          Back
        </Button>
        <Card>
          <Card.Header>
            <h3>
              <i className="fa fa-user-plus mr-3" />
              Add Customer
            </h3>
          </Card.Header>
          <Card.Body>
            <Form
              noValidate
              validated={validated}
              onSubmit={e => this.handleSubmit(e)}
            >
              <Form.Row>
                <Form.Group as={Col} controlId="first_name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter name"
                    aria-describedby="first_name"
                    name="first_name"
                    ref="first_name"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please write a name
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="second_name">
                  <Form.Label>Second Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter second name"
                    name="second_name"
                    ref="second_name"
                    aria-describedby="second_name"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please write a second name
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="mobile_phone">
                  <Form.Label>Number phone</Form.Label>
                  <Form.Control
                    required
                    placeholder="Enter number"
                    name="mobile_phone"
                    ref="mobile_phone"
                    aria-describedby="mobile_phone"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please write a number
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="work_phone">
                  <Form.Label>Number phone_2nd</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter number"
                    name="work_phone"
                    ref="work_phone"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  placeholder="email address"
                  name="email"
                  ref="email"
                  aria-describedby="email"
                />
                <Form.Control.Feedback type="invalid">
                  Please write email e.g email@mail.com
                </Form.Control.Feedback>
              </Form.Group>
              <Row>
                <Col>
                  <h4>Delivery Address</h4>
                </Col>
              </Row>
              <Form.Row>
                <Form.Group as={Col} controlId="shipping_street">
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    required
                    placeholder="street"
                    name="shipping_street"
                    ref="shipping_street"
                    aria-describedby="shipping_street"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid street
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="shipping_number">
                  <Form.Label>Number</Form.Label>
                  <Form.Control
                    required
                    placeholder="number"
                    name="shipping_number"
                    ref="shipping_number"
                    aria-describedby="shipping_number"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid number
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="shipping_zipcode">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    required
                    placeholder="zip"
                    name="shipping_zipcode"
                    ref="shipping_zipcode"
                    aria-describedby="shipping_zipcode"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid zip
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="shipping_city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    required
                    placeholder="city name"
                    name="shipping_city"
                    ref="shipping_city"
                    aria-describedby="shipping_city"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid city
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="shipping_country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    required
                    placeholder="country name"
                    name="shipping_country"
                    ref="shipping_country"
                    aria-describedby="shipping_country"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid country
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Row>
                <Col>
                  <Form.Group controlId="checked">
                    <Form.Check
                      type="checkbox"
                      label="Billing address: same as shipping address"
                      onChange={this.handleCheck}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h4>Billing Address</h4>
                </Col>
              </Row>
              <Form.Row>
                <Form.Group as={Col} controlId="billing_street">
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    required
                    placeholder="street"
                    name="billing_street"
                    ref="billing_street"
                    aria-describedby="billing_street"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid street
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} xs="2" controlId="billing_number">
                  <Form.Label>Number</Form.Label>
                  <Form.Control
                    required
                    placeholder="number"
                    name="billing_number"
                    ref="billing_number"
                    aria-describedby="billing_number"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid number
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="billing_zipcode">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    required
                    placeholder="zip"
                    name="billing_zipcode"
                    ref="billing_zipcode"
                    aria-describedby="billing_zipcode"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid zip
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="billing_city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    required
                    placeholder="city name"
                    name="billing_city"
                    ref="billing_city"
                    aria-describedby="billing_city"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid city
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="billing_country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    required
                    placeholder="country name"
                    name="billing_country"
                    ref="billing_country"
                    aria-describedby="billing_country"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid country
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Button variant="primary" type="submit" value="Save">
                Submit form
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default AddCustomer;
