import React, { useContext, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../../App";

const Cart = (props) => {
  const productDetails = props.productDetails;
  const { _id, name, weight, price, imageURL } = productDetails;

  return (
    <div className="col-sm-12 col-md-3">
      <Card className="m-2" style={{ width: "18rem" }}>
        <Card.Img style={{ height: "200px" }} variant="top" src={imageURL} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Link to={`/checkOut/${_id}`}>
            <Button variant="primary">Buy Now</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Cart;
