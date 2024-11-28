import express from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/User.js'
import jwt, { decode } from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const router = express.Router()

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body

  console.log('Data received', req.body)

  const user = await User.findOne({ email })

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ status: 'Error', message: 'All fields are required.' })
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    })

    await newUser.save()

    return res
      .status(201)
      .json({ status: 'true', message: 'Record stored successfully' })
  } catch (error) {
    console.error('Error during user creation:', error)
    return res.status(500).json({
      status: 'Error',
      message: 'An error occurred during registration',
    })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({ message: 'User is not registered' })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.json({ message: 'Password is incorrect' })
    }

    const token = jwt.sign({ username: user.username }, process.env.KEY, {
      expiresIn: '1h',
    })
    res.cookie('token', token, { httpOnly: true, maxAge: 360000 })
    return res.status(200).json({ status: true, message: 'Login Successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server Error' })
  }
})

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({ message: 'User not registered' })
    }

    const token = jwt.sign({ id: user.id }, process.env.KEY, {
      expiresIn: '5m',
    })

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'email address',
        pass: 'password',
      },
    })

    var mailOptions = {
      from: 'email address',
      to: recepient email,
      subject: 'Reset Password',
      text: `Click this link to reset your password: password reset link`,
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
        return res.json({ message: 'Error sending email' })
      } else {
        return res.json({ status: true, message: 'Email sent' })
      }
    })
  } catch (err) {
    console.log(err)
  }
})

router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params
  const { password } = req.body

  try {
    const decoded = await jwt.verify(token, process.env.KEY)
    const id = decoded.id
    const hashPassword = await bcrypt.hash(password, 10)
    await User.findByIdAndUpdate({ _id: id }, { password: hashPassword })
    return res.json({ status: true, message: 'Update Password' })
  } catch (error) {
    console.log(error)
    return res.json('Invalid token')
  }
})

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token) {
      return res.json({ status: false, message: 'No token' })
    }
    const decoded = await jwt.verify(token, process.env.KEY)
    next()
  } catch (error) {
    return res.json(error)
  }
}

router.get('/verify', verifyUser, (req, res) => {
  return res.json({ status: true, message: 'Authorized' })
})

router.get('/logout', (req, res)=>{
  res.clearCookie('token')
  return res.json({status: true})
})



export { router as UserRouter }
