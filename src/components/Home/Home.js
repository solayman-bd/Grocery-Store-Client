import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Cart from "../Cart/Cart";

const Home = () => {
  const [productsInfo, setProductsInfo] = useState([]);
  useEffect(() => {
    fetch(`https://mighty-crag-80917.herokuapp.com/allProductsDetails`)
      .then((res) => res.json())
      .then((data) => setProductsInfo(data));
  }, []);

  return (
    <div className="row m-3">
      {productsInfo.length > 0 ? (
        productsInfo.map((pd) => <Cart key={pd._id} productDetails={pd}></Cart>)
      ) : (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </div>
  );
};

export default Home;
