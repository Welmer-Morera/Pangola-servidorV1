
const Partido  = require('../models/Partido')
const { validationResult}= require('express-validator') 
exports.crearPartido =async (req, res)=>{


    const errores  =validationResult(req)

    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})

    }



    const {fecha, hora }= req.body



    try {
        
         const  partido = new Partido(req.body)

         partido.creador= req.usuario.id
         partido.save()
         res.json(partido)

    } catch (error) {
        console.log(error)
        res.status(500).send('hubo un error') 
    }
}

exports.obtenerPartidos = async (req,res)=>{
    try {
         const partidos = await Partido.find({creador: req.usuario.id}). sort({creado:-1})
         res.json({partidos})
    } catch (error) {
        console.log(error)
        res.status(500).send('hubo un error') 
    }
}


exports.actualizarPartido =async (req,res)=>{
    const errores  =validationResult(req)

    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})

    }

    const {fecha, hora }= req.body
    const nuevoPartido ={}
    if(fecha){
        nuevoPartido.fecha=fecha
        
    }
    if(hora){
       
        nuevoPartido.hora=hora
    }

     try {
         let partido= await Partido.findById(req.params.id)

         if(!partido){
             return res.status(404).json({msg:'Partido no encontrado'})
         }

         if (partido.creador.toString() !==  req.usuario.id){
            return res.status(401).json({msg:'No posee autorización'})
         }

         partido = await Partido.findByIdAndUpdate({_id:req.params.id},{$set: nuevoPartido},{new: true})
         
          res.json({partido})
     } catch (error) {
         console.log(error)
         res.status(500).send(' error en el servidor') 
     }
    

} 
exports.eliminarPartido = async(req,res)=>{
    try {
        let partido= await Partido.findById(req.params.id)

         if(!partido){
             return res.status(404).json({msg:'Partido no encontrado'})
         }

         if (partido.creador.toString() !==  req.usuario.id){
            return res.status(401).json({msg:'No posee autorización'})
         }


         await Partido.findOneAndRemove({_id: req.params.id})
         res.json({msg:'Datos del partido eliminado'})



        
    } catch (error) {
        console.log(error)
         res.status(500).send(' error en el servidor') 
    }

}