const mongoose = require('mongoose')

const DatoSchema = mongoose.Schema({

    equipo1:{
        type:String,
        required:true,
        trim:true

    },
    equipo2:{
        type:String,
        required:true,
        trim:true
    },
    pago1:{
        type:Number,
        required:true,
        },
    pago2:{
        type:Number,
        required:true,
    },
    total:{
        type:Number,
        required:true,
    },
    estado:{
        type:Boolean,
        default: false
    },
    creado:{
        type:Date,
        default:Date.now() 
    },
    partido:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Partido'
    }


})
module.exports=mongoose.model('Dato', DatoSchema)