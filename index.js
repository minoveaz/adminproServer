require('dotenv').config();

const express = require('express')
const cors = require('cors')

const {dbConnection} = require('./database/config');

//crear el servidor de express
const app = express()
const port = process.env.PORT


// Base de Datos
dbConnection();

// Configurar CORS
app.use(cors());

// body read and parsing
app.use( express.json());

// public directory

app.use(express.static('public'));

//rutas
app.use('/api/users', require('./routes/users.router'));
app.use('/api/hospitals', require('./routes/hospitals.router'));
app.use('/api/doctors', require('./routes/doctors.router'));
app.use('/api/login', require('./routes/auth.router'));
app.use('/api/searchAll', require('./routes/searchs.router'));
app.use('/api/upload', require('./routes/upload.router'));

app.listen(port, () => {
  console.log(`Admin Pro Server listening at http://localhost:${port}`);
})





