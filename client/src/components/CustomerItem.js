import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";

class CustomerItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item
    };
  }

  render() {
    return (
      <ListGroup>
        <ListGroup.Item
          action
          variant="light"
          href={`/items/${this.state.item._id}`}
        >
          <h4 className="list">
            {this.state.item.second_name} {this.state.item.first_name}
          </h4>

          {/* <Col sm="2">
              <i className="fa fa-id-card" />
            </Col> */}
        </ListGroup.Item>
      </ListGroup>
    );
  }
}
export default CustomerItem;
