import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { loginUser, registerUser } from './controllers/auth.controller.js';

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = 3000;

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('MongoDB conectado com sucesso')
}).catch((error) => {
    console.log('Erro no MongoDB', error)
})

app.post('/register', registerUser)

app.post('/login', loginUser)

app.listen(port, () => {
    console.log('Server iniciado com sucesso')
})
