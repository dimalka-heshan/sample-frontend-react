import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  margin: 0 auto;
  max-width: 600px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Label = styled.label`
  font-size: 0.9em;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #009879;
  color: #ffffff;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
`;

const AddEmployee = () => {
  const [employee, setEmployee] = useState({ name: "", city: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5120/api/Employee", employee)
      .then((response) => {
        window.history.back();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Container>
      <h1>Add New Employee</h1>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="name">Name:</Label>
        <Input
          type="text"
          name="name"
          id="name"
          value={employee.name}
          onChange={handleChange}
        />

        <Label htmlFor="city">City:</Label>
        <Input
          type="text"
          name="city"
          id="city"
          value={employee.city}
          onChange={handleChange}
        />

        <Button type="submit">Add Employee</Button>
      </Form>
    </Container>
  );
};

export default AddEmployee;