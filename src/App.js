import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageEmployees from "./pages/ManageEmployees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<ManageEmployees />} />
        <Route path="/add" exact element={<AddEmployee />} />
        <Route path="/edit/:id" exact element={<EditEmployee />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;