import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark" style={{minHeight: "8.5%"}}>
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">Notes App</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {localStorage.getItem("token") && <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/">Home</Link>
                </li>}
            </ul>
            {localStorage.getItem("token")? <button onClick={handleLogout} type='button' className="btn btn-danger">Logout</button>: <form className="d-flex">
                <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
            </form>}
            </div>
        </div>
    </nav>
  )
}

export default Navbar