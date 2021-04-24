const express = require('express')
const conectarDB = require('./config/db')
const  cors= require('cors')

const app = express();


conectarDB()

app.use(cors())

app.use(express.json({extends:true}))

const PORT =    process.env.PORT||4000;


app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/partidos', require('./routes/partidos'))
app.use('/api/datos', require('./routes/datos'))
 

app.listen(PORT,()=>{
    console.log(`el servidor funcionacorrectamente en le puerto ${PORT}`);
})
