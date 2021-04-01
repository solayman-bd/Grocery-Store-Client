import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

const Order = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [customerDetails, setCustomerDetails] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/customerInfo`)
      .then((res) => res.json())
      .then((data) => setCustomerDetails(data));
  }, []);

  const foundData = customerDetails.filter(
    (data) => data.email === loggedInUser.email
  );
  console.log(foundData);
  return (
    <div>
      <h1>Order Details:</h1>
      {foundData.length > 0 && (
        <div>
          <h3>User Email:{foundData[0].email}</h3>

          {foundData.map((data) => (
            <li>
              Name: {data.name}, Price: {data.price || 20}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
