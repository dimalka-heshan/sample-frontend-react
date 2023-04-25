import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  margin: 0 auto;
  max-width: 600px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
`;

const TableHead = styled.thead`
  background-color: #009879;
  color: #ffffff;
  text-align: left;
`;

const TableHeader = styled.th`
  padding: 12px 15px;
`;

const TableBody = styled.tbody`
  background-color: #ffffff;
  font-size: 0.8em;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #dddddd;
`;

const TableData = styled.td`
  padding: 12px 15px;
`;

const Button = styled.button`
  background-color: #009879;
  color: #ffffff;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  margin-right: 20px;
`;

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5120/api/Employee");
      console.log(response.data)
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete =  async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
      if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5120/api/Employee/${id}`);
        setEmployees((prevState) =>
          prevState.filter((employee) => employee.id !== id)
        );
      } catch (error) {
        console.error(error);
      }
  }
  };

  const handleEdit = (id) => {
    window.location.href = `/edit/${id}`;
  };

  const handleAddNew = () => {
    window.location.href = "/add"
  };

  return (
    <Container>
      <h1>Manage Employees</h1>
      <Button onClick={handleAddNew}>Add New Employee</Button>
      <Table>
        <TableHead>
          <tr>
            <TableHeader>ID</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>City</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableData>{employee.id}</TableData>
              <TableData>{employee.name}</TableData>
              <TableData>{employee.city}</TableData>
              <TableData>
                <Button onClick={() => handleEdit(employee.id)}>Edit</Button>
                <Button onClick={() => handleDelete(employee.id)}>
                  Delete
                </Button>
              </TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ManageEmployees;