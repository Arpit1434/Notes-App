import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
   })

   const navigate = useNavigate()

   const host = process.env.REACT_APP_BACKEND

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, password } = credentials
    const response = await fetch(`${host}/api/auth/createuser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
    const json = await response.json()
    if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem('token', json.authtoken)
        props.showAlert("Account Created Successfully", "success")
        navigate("/")
    } else {
        props.showAlert("Invalid Credentials", "danger")
    }
  }

  const handleChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
    <div className='pt-3 container d-grid' style={{ height: "100%", placeContent: "center" }}>
        <div className='p-4 border border-2 rounded shadow-sm' style={{ minWidth: "25vw" }}>
            <h2 className="mb-3">Signup</h2>
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={handleChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmpassword" name="confirmpassword" onChange={handleChange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className='pt-2'><Link className='text-decoration-none' to="/login">Already have an account?</Link></div>
        </div>
    </div>
  )
}

export default Signup