import logo from './logo.svg';
import './App.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Employee from './Employee'
import Home from './Home'
import Department from './Department'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h2 className="d-flex justify-content-center m-3">
        Employee CURD Operation</h2>
        <nav className="navbar navbar-expand-sm bg-light navabr-dark">
          <ul className="navbar-nav">
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/home">
              Home
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/department">
              Department
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/employee">
              Employee
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/home' Component={Home}></Route>
          <Route path='/department' Component={Department}></Route>
          <Route path='/employee' Component={Employee}></Route>
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
