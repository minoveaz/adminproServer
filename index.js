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
app.use(cors())

//RKAYHHJK57FPW5Du
//mean_user

//rutas
app.get('/', (req, res) => {
  res.json({
      ok: true,
      msg: 'hola mundo'
  })
})

app.listen(port, () => {
  console.log(`Admin Pro Server listening at http://localhost:${port}`)
})



