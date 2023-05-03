import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";

const Container = styled.div`
  margin: 0 auto;
  max-width: 800px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  label {
    margin-bottom: 5px;
    font-weight: bold;
  }

  input[type="text"] {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
    font-size: 16px;
  }

  button {
    padding: 10px;
    border-radius: 5px;
    background-color: #0077cc;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
`;

const EditEmployee = () => {
    const { id } = useParams();
  const [employee, setEmployee] = useState({ name: "", city: "" });

  const fetchEmployee = async () => {
    const response = await axios.get(`http://localhost:5120/api/Employee/${id}`);
    setEmployee(response.data);
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (event) => {
    console.log(employee)
    event.preventDefault();

    try {
      await axios.post(`http://localhost:5120/api/Employee/${id}`, employee);
      alert("Employee updated successfully!");
      window.history.back();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h1>Edit Employee</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" value={employee.name} onChange={handleInputChange} />
        <label htmlFor="city">City</label>
        <input type="text" name="city" id="city" value={employee.city} onChange={handleInputChange} />
        <button type="submit">Update Employee</button>
      </Form>
    </Container>
  );
};

export default EditEmployee;