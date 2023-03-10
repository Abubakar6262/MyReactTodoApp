import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'
export default function Navbar() {
const {myname,setMyname} = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">LOGO</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to="/" className="nav-link active" aria-current="page">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/todos" className="nav-link">Todos</Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link">About</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-link">Contact</Link>
        </li>
        <li className="nav-item">
          <Link to="/signin" className="nav-link">SignIn</Link>
        </li>
        <li className="nav-item">
          <Link to="/signup" className="nav-link">SignUp</Link>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item">Action</a></li>
            <li><a className="dropdown-item">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item">Something else here</a></li>
          </ul>
        </li>
      </ul>
      <div className="d-flex">
      <input className="form-control me-2" type="search" placeholder="change User Name" onChange={e=>{setMyname(e.target.value)}} aria-label="Search"/>
        <p className='text-end text-white pt-2 mb-0 w-50'><b>Hi </b>{ myname}</p>
      </div>
      {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
    </div>
  </div>
</nav>
  )
}
