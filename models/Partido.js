const mongoose = require('mongoose')

const PartidoSchema = mongoose.Schema({

    fecha:{
        type:String,
        required:true,
        trim: true

    },
    hora:{
        type:String,
        required:true,
        trim: true

    },
    creador:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usuario'

    },
    creado:{
        type:Date,
        default:Date.now()

    }
})
module.exports = mongoose.model('Partido',PartidoSchema)