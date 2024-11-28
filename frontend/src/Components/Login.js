import React, { useRef, useState } from 'react'
import '../App.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const rEmail = useRef()
  const rPassword = useRef()

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const hEmail = (e) => {
    setEmail(e.target.value)
  }
  const hPassword = (e) => {
    setPassword(e.target.value)
  }

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault()

    let url = 'http://localhost:3000/auth/login'
    let data = { email, password }
    axios
      .post(url, data)
      .then((response) => {
        if(response.data.status){
        navigate('/')
        console.log(response)
        setEmail('')
        setPassword('')}else{
          navigate('/login')
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="sign-up-container">
      <form onSubmit={handleSubmit} className="sign-up-form">
        <h1>Login</h1>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Enter email"
          onChange={hEmail}
          ref={rEmail}
          value={email}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="Enter password"
          onChange={hPassword}
          ref={rPassword}
          value={password}
        />

        <button type="submit">Login</button>
        <Link to="/forgotPassword">Forgot Password</Link>
        <p>
          Don't have account?<Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
