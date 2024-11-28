import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors';
import { UserRouter } from './routes/user.js'
import cookieParser from 'cookie-parser';

const app = express()
app.use(express.json())
app.use(cors({
  origin: ['http://localhost:3001'],
  credentials: true
}))
app.use(cookieParser())
app.use('/auth', UserRouter)

dotenv.config()

mongoose
  .connect('mongodb://localhost:27017/reactdata')
  .then(console.log('Connected to MongoDB'))
  .catch((err) => {
    console.log(err)
  })

app.listen(3000, () => {
  console.log(`Server is running @ 3000`)
})





