import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const EditProducts = () => {
  const [editPageRedirection, setEditPageRedirection] = useState(false);
  const [productsInfo, setProductsInfo] = useState([]);
  useEffect(() => {
    fetch(`https://mighty-crag-80917.herokuapp.com/allProductsDetails`)
      .then((res) => res.json())
      .then((data) => {
        setProductsInfo(data);
      })
      .catch((err) => console.log(err));
  }, [editPageRedirection]);
  const deleteItem = (id) => {
    fetch(`https://mighty-crag-80917.herokuapp.com/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          alert("Deleted Successfully");
          setEditPageRedirection(true);
        }
      });
  };

  return (
    <div>
      <ol>
        {productsInfo &&
          productsInfo.map((pd) => (
            <li className="my-2">
              {pd.name}{" "}
              <Button
                onClick={() => deleteItem(pd._id)}
                className="mx-2"
                variant="danger"
              >
                Delete
              </Button>{" "}
            </li>
          ))}
      </ol>
    </div>
  );
};

export default EditProducts;
