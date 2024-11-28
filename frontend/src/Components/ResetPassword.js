import axios from 'axios'
import React, { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ResetPassword = () => {
    const rPassword = useRef()

    const navigate = useNavigate()
  
    const [password, setPassword] = useState('')
    const {token} = useParams()
  
    const hPassword = (e) => {
        setPassword(e.target.value)
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      let url = 'http://localhost:3000/auth/reset-password/'+token
      let data = { password }
      axios
        .post(url, data)
        .then((response) => {
          if(response.data.status){
          navigate('/login')
        }
        console.log(response.data)
        })
        .catch((err) => console.log(err))
    }
  return (
    <div>
        <div className="sign-up-container">
      <form onSubmit={handleSubmit} className="sign-up-form">
        <h1>Reset Password</h1>
        

        <label htmlFor="password">New Password: </label>
        <input
          type="password"
          autoComplete="off"
          placeholder="Enter email"
          onChange={hPassword}
          ref={rPassword}
          value={password}
        />

        <button type="submit">Reset</button>
      </form>
    </div>
    </div>
  )
}

export default ResetPassword
