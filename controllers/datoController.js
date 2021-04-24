const Dato = require('../models/Dato')
const Partido  = require('../models/Partido')
const { validationResult}= require('express-validator') 


exports.crearDato= async(req,res)=>{

    const errores  =validationResult(req)

    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})

    }



    
    try {
        const  { partido}= req.body
        let partidoActual= await Partido.findById(partido)
        if(!partidoActual){
            return res.status(404).json({msg:'El Partido no encontrado'})
        }
        
        if (partidoActual.creador.toString() !==  req.usuario.id){
            return res.status(401).json({msg:'No posee autorización'})
         }

        const dato = new Dato(req.body)
        await dato.save()
        res.json({dato})





         
    } catch (error) {
        console.log(error)
        res.status(500).send('hubo un error') 
    }

}
exports.obtenerDatos = async (req,res)=>{
try {
        const  { partido}= req.query

         let partidoActual= await Partido.findById(partido)

        if(!partidoActual){
            return res.status(404).json({msg:'El Partido no encontrado'})
        }
        
        if (partidoActual.creador.toString() !==  req.usuario.id){
            return res.status(401).json({msg:'No posee autorización'})
         }

        const datos = await Dato.find({partido})

        res.json({datos})



} catch (error) {
    console.log(error)
        res.status(500).send('hubo un error') 
}

}

exports.actualizarDato = async (req,res) =>{

    try {
        const  { partido, equipo1, equipo2, pago1,pago2, total, estado}= req.body
        
        let datoActual = await Dato.findById(req.params.id) 

        if(!datoActual){
            return res.status(404).json({msg:'No existen los Datos'})
        }
        
        const partidoActual= await Partido.findById(partido)

        if (partidoActual.creador.toString() !==  req.usuario.id){
            return res.status(401).json({msg:'No posee autorización'})
         }

         const nuevoDato={}

       
            nuevoDato.equipo1 =equipo1
        
       
            nuevoDato.equipo2 =equipo2
        
            nuevoDato.pago1 =pago1
       
            nuevoDato.pago2 =pago2
        
            nuevoDato.total =total
        
            nuevoDato.estado =estado
        


        datoActual= await Dato.findOneAndUpdate({_id:req.params.id},nuevoDato,{new:true})
        res.json({datoActual})


        
    } catch (error) {
        console.log(error)
        res.status(500).send('hubo un error') 
    }
}

exports.eliminarDato = async (req,res) =>{

    try {
        const  { partido }=req.query
        
        let datoActual = await Dato.findById(req.params.id) 

        if(!datoActual){
            return res.status(404).json({msg:'No existen los Datos'})
        }
        
        const partidoActual= await Partido.findById(partido)

        if (partidoActual.creador.toString() !==  req.usuario.id){
            return res.status(401).json({msg:'No posee autorización'})
         }

          await Dato.findByIdAndRemove({_id:req.params.id})
          res.json({msg:'Datos eliminados'})

        
    } catch (error) {
        console.log(error)
        res.status(500).send('hubo un error') 
    }

}