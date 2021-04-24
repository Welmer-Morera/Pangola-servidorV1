const mongoose = require('mongoose')
require ('dotenv').config({path:'varibales.env'})

const conectarDB = async ()=>{
 try {
     await mongoose.connect(process.env.DB_MONGO,{
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useFindAndModify: false
     })
     console.log('Conexión exitosa ')
 } catch (error) {
     console.log(error)
     process.exit(1)
 }
}

module.exports= conectarDB