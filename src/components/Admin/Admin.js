import React, { useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import AddProducts from "../AddProducts/AddProducts";
import EditProducts from "../EditProducts/EditProducts";

const Admin = () => {
  const [manageProducts, setManageProducts] = useState(true);

  const editProducts = () => {
    setManageProducts(false);
  };

  return (
    <div className="row">
      <div className="col-sm-12 col-md-2 bg-primary">
        <h4>
          <button
            onClick={() => setManageProducts(true)}
            className="btn btn-secondary"
          >
            Add Products
          </button>
        </h4>
        <h4>
          <button onClick={() => editProducts()} className="btn btn-secondary">
            Edit Products
          </button>
        </h4>
      </div>
      <div className="col-sm-12 col-md-10">
        {manageProducts ? <AddProducts /> : <EditProducts />}
      </div>
    </div>
  );
};

export default Admin;
