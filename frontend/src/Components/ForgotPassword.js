import axios from 'axios'
import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const rEmail = useRef()

  
    const navigate = useNavigate()
  
    const [email, setEmail] = useState('')
  
    const hEmail = (e) => {
      setEmail(e.target.value)
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      let url = 'http://localhost:3000/auth/forgot-password'
      let data = { email }
      axios
        .post(url, data)
        .then((response) => {
          if(response.data.status){
            alert('Check your email for reset password.')
          navigate('/login')
          console.log(response)
          setEmail('')}else{
            navigate('/signup')
          }
        })
        .catch((err) => console.log(err))
    }
  return (
    <div>
        <div className="sign-up-container">
      <form onSubmit={handleSubmit} className="sign-up-form">
        <h1>Forgot Password</h1>
        

        <label htmlFor="email">Email: </label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Enter email"
          onChange={hEmail}
          ref={rEmail}
          value={email}
        />

        <button type="submit">Send Email</button>
      </form>
    </div>
    </div>
  )
}

export default ForgotPassword
