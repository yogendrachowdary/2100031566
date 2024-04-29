import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmpListing from './components/EmployeeList';
import EmpCreate from './components/createEmployee';
import EmpDetail from './components/EmployeeDetails';
import EmpEdit from './components/EditEmployee';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
       <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/employee">Employees</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home/>}></Route>
          <Route path='/employee' element={<EmpListing />}></Route>
          <Route path='employee/employee/create' element={<EmpCreate />}></Route>

          <Route path='employee/employee/detail/:empid' element={<EmpDetail />}></Route>
          <Route path='/employee/edit/:empid' element={<EmpEdit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;