import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Col, Container, Card, Row } from "react-bootstrap";
import $ from "jquery";

class EditCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      first_name: "",
      second_name: "",
      mobile_phone: "",
      work_phone: "",
      email: "",
      shipping_street: "",
      shipping_number: "",
      shipping_zipcode: "",
      shipping_city: "",
      shipping_country: "",
      billing_street: "",
      billing_number: "",
      billing_zipcode: "",
      billing_city: "",
      billing_country: "",
      validated: false,
      isChecked: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }
  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    this.getCustomerDetails();
  }
  getCustomerDetails() {
    const {
      match: { params }
    } = this.props;

    axios
      .get(`/api/items/${params.id}`)
      .then(response => {
        this.setState({
          _id: response.data._id,
          first_name: response.data.first_name,
          second_name: response.data.second_name,
          mobile_phone: response.data.mobile_phone,
          work_phone: response.data.work_phone,
          email: response.data.email,
          shipping_street: response.data.shipping_street,
          shipping_number: response.data.shipping_number,
          shipping_zipcode: response.data.shipping_zipcode,
          shipping_city: response.data.shipping_city,
          shipping_country: response.data.shipping_country,
          billing_street: response.data.billing_street,
          billing_number: response.data.billing_number,
          billing_zipcode: response.data.billing_zipcode,
          billing_city: response.data.billing_city,
          billing_country: response.data.billing_country
        });
      })
      .catch(err => console.log(err));
  }
  editCustomer(newCustomer) {
    axios
      .request({
        method: "put",
        url: `http://localhost:5000/api/items/${this.state._id}`,
        data: newCustomer
      })
      .then(response => {
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  }

  handleSubmit(e) {
    e.preventDefault();
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
      this.editCustomer(newCustomer);
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
    const {
      validated,
      first_name,
      second_name,
      mobile_phone,
      work_phone,
      email,
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
    } = this.state;
    return (
      <Container className="my-5">
        <Button href="/" variant="dark" className="my-3">
          Back
        </Button>
        <Card className="mb-5">
          <Card.Header>
            <h3>
              <i className="fa fa-user mr-3" />
              Edit Customer
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
                    value={first_name}
                    required
                    type="text"
                    placeholder="Enter name"
                    aria-describedby="first_name"
                    name="first_name"
                    ref="first_name"
                    onChange={this.handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please write a name
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="second_name">
                  <Form.Label>Second Name</Form.Label>
                  <Form.Control
                    value={second_name}
                    required
                    type="text"
                    placeholder="Enter second name"
                    name="second_name"
                    ref="second_name"
                    aria-describedby="second_name"
                    onChange={this.handleInputChange}
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
                    value={mobile_phone}
                    onChange={this.handleInputChange}
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
                    value={work_phone}
                    onChange={this.handleInputChange}
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
                  value={email}
                  onChange={this.handleInputChange}
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
                  <Form.Control
                    required
                    placeholder="street"
                    name="shipping_street"
                    ref="shipping_street"
                    aria-describedby="shipping_street"
                    value={shipping_street}
                    onChange={this.handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid street
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} xs="2" controlId="shipping_number">
                  <Form.Control
                    required
                    placeholder="number"
                    name="shipping_number"
                    ref="shipping_number"
                    aria-describedby="shipping_number"
                    value={shipping_number}
                    onChange={this.handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid number
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="shipping_zipcode">
                  <Form.Control
                    required
                    placeholder="zip"
                    name="shipping_zipcode"
                    ref="shipping_zipcode"
                    aria-describedby="shipping_zipcode"
                    value={shipping_zipcode}
                    onChange={this.handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid zip
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="shipping_city">
                  <Form.Control
                    required
                    placeholder="city name"
                    name="shipping_city"
                    ref="shipping_city"
                    aria-describedby="shipping_city"
                    value={shipping_city}
                    onChange={this.handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid city
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="shipping_country">
                  <Form.Control
                    required
                    placeholder="country name"
                    name="shipping_country"
                    ref="shipping_country"
                    aria-describedby="shipping_country"
                    value={shipping_country}
                    onChange={this.handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid country
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Row>
                <Col>
                  <h4>Billing Address</h4>
                </Col>
              </Row>
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
              <Form.Row>
                <Form.Group as={Col} controlId="billing_street">
                  <Form.Control
                    required
                    placeholder="street"
                    name="billing_street"
                    ref="billing_street"
                    aria-describedby="billing_street"
                    value={billing_street}
                    onChange={this.handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid street
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} xs="2" controlId="billing_number">
                  <Form.Control
                    required
                    placeholder="number"
                    name="billing_number"
                    ref="billing_number"
                    aria-describedby="billing_number"
                    value={billing_number}
                    onChange={this.handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid number
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="billing_zipcode">
                  <Form.Control
                    required
                    placeholder="zip"
                    name="billing_zipcode"
                    ref="billing_zipcode"
                    aria-describedby="billing_zipcode"
                    value={billing_zipcode}
                    onChange={this.handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid zip
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="billing_city">
                  <Form.Control
                    required
                    placeholder="city name"
                    name="billing_city"
                    ref="billing_city"
                    aria-describedby="billing_city"
                    value={billing_city}
                    onChange={this.handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid city
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="billing_country">
                  <Form.Control
                    required
                    placeholder="country name"
                    name="billing_country"
                    ref="billing_country"
                    aria-describedby="billing_country"
                    value={billing_country}
                    onChange={this.handleInputChange}
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

export default EditCustomer;
