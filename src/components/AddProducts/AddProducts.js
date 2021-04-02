import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

const AddProducts = () => {
  const { register, handleSubmit } = useForm();
  const [imageURL, setIMageURL] = useState(null);

  const onSubmit = (info) => {
    const submittedData = {
      name: info.name,
      weight: info.weight,
      price: info.price,
      imageURL: imageURL,
    };
    console.log(submittedData.imageURL);
    const url = `https://mighty-crag-80917.herokuapp.com/addProducts`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submittedData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          alert("Product Added Successfully");
          window.location.reload();
        }
      });
  };
  const handleImageUpload = (event) => {
    const imageData = new FormData();
    imageData.set("key", "b198b878d5802f6c921822a73b4978e2");
    imageData.append("image", event.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        setIMageURL(response.data.data.display_url);
        console.log(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="mx-2">
      <h1>Add Products</h1>
      <div className="col-12">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <Form.Group controlId="">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="name"
                  name="name"
                  placeholder="Product Name"
                  ref={register}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="">
                <Form.Label>Product Weight</Form.Label>
                <Form.Control
                  type="name"
                  name="weight"
                  placeholder="Product Weight"
                  ref={register}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="">
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                  type="name"
                  name="price"
                  placeholder="Product Price"
                  ref={register}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.File
                  id="exampleFormControlFile1"
                  onChange={handleImageUpload}
                  label="Add Photo"
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="success" type="submit">
            Submit
          </Button>{" "}
        </Form>
      </div>
    </div>
  );
};

export default AddProducts;
