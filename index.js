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

//rutas
app.use('/api/users', require('./routes/users.router'));

app.listen(port, () => {
  console.log(`Admin Pro Server listening at http://localhost:${port}`);
})



