import React, { useContext, useEffect, useState } from "react";
import { Button, Jumbotron, Table } from "react-bootstrap";
import { useParams } from "react-router";
import { UserContext } from "../../App";

const CheckOut = (props) => {
  const { id } = useParams();
  console.log(id);

  const [productsInfo, setProductsInfo] = useState([]);

  useEffect(() => {
    fetch(`https://mighty-crag-80917.herokuapp.com/allProductsDetails`)
      .then((res) => res.json())
      .then((data) => {
        setProductsInfo(data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  console.log(productsInfo);
  const foundData = productsInfo.filter((data) => data._id === id);

  console.log(foundData[0]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  if (foundData[0]) {
    const { name, imageURL, price } = foundData[0];
    const handleBuying = () => {
      const newBuyingDetails = { ...loggedInUser, name, imageURL, price };
      fetch(`https://mighty-crag-80917.herokuapp.com/addBuying`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBuyingDetails),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    };
    handleBuying();
  }

  return (
    <div className="container">
      {foundData[0] && (
        <Jumbotron>
          <h3>Check Out</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{foundData[0].name}</td>
                <td>1</td>
                <td>{foundData[0].price}</td>
              </tr>

              <tr>
                <td colSpan="2">Total Price</td>
                <td>{foundData[0].price}</td>
              </tr>
              <tr>
                <td colSpan="2"></td>
                <td>
                  <Button variant="primary">Proceed </Button>{" "}
                </td>
              </tr>
            </tbody>
          </Table>
        </Jumbotron>
      )}
    </div>
  );
};

export default CheckOut;
