import React, { useRef, useState } from 'react'
import '../App.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const rUsername = useRef()
  const rEmail = useRef()
  const rPassword = useRef()

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const hUsername = (e) => {
    setUsername(e.target.value)
  }
  const hEmail = (e) => {
    setEmail(e.target.value)
  }
  const hPassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let url = 'http://localhost:3000/auth/signup'
    let data = { username, email, password }
    axios
      .post(url, data)
      .then((response) => {
        if(response.data.status){
        navigate('/login')
        console.log(response)
        setUsername('')
        setEmail('')
        setPassword('')}else{
          navigate('/signup')
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="sign-up-container">
      <form onSubmit={handleSubmit} className="sign-up-form">
        <h1>Signup</h1>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          placeholder="Enter username"
          onChange={hUsername}
          ref={rUsername}
          value={username}
        />

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

        <button type="submit">Sign Up</button>
        <p>Already have account?<Link to = '/login'>Login</Link></p>
      </form>
    </div>
  )
}

export default Signup
