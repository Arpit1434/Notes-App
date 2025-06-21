import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })

  const host = process.env.REACT_APP_BACKEND

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = credentials
    const response = await fetch(`${host}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
    const json = await response.json()
    if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem('token', json.authtoken)
        props.showAlert("Logged in Successfully", "success")
        navigate("/")
    } else {
        props.showAlert("Invalid Credentials", "danger")
    }
  }

  const handleChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className='mt-3 container'>
      <h2 className="my-3">Login to continue to Notes App</h2>
      <form onSubmit={handleSubmit}>
          <div className="my-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handleChange}/>
          </div>
          <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={handleChange}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login