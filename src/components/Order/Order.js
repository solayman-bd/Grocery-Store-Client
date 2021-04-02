import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../../App";

const Order = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [customerDetails, setCustomerDetails] = useState([]);
  useEffect(() => {
    fetch(`https://mighty-crag-80917.herokuapp.com/customerInfo`)
      .then((res) => res.json())
      .then((data) => setCustomerDetails(data));
  }, []);

  const foundData = customerDetails.filter(
    (data) => data.email === loggedInUser.email
  );
  console.log(foundData);
  return (
    <div>
      <h1 className="text-center mb-3">Order Details:</h1>
      {foundData.length > 0 && (
        <div>
          <div className="text-success text-center mx-auto">
            <h4>User Name: {loggedInUser.name}</h4>
            <h5>User Email:{foundData[0].email}</h5>
          </div>

          <div className="mx-auto w-25 mt-3 text-danger">
            <ol>
              {foundData.map((data) => (
                <li>
                  Name: {data.name}, Price: {data.price || 20} BDT
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
