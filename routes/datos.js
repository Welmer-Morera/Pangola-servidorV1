const express = require('express')
const router = express.Router()
const datoController = require('../controllers/datoController')
const auth = require ('../middleware/auth')
const {check} = require('express-validator')


router.post('/',
auth,
[
    check('equipo1','El equipo #1 es obligatorio').not().isEmpty(),
    check('equipo2','El equipo #2 es obligatorio').not().isEmpty(),
    check('pago1','El pago #1 es obligatorio').not().isEmpty(),
    check('pago2','El pago #2 es obligatorio').not().isEmpty(),
    check('partido','El partido es obligatorio').not().isEmpty(),
   
],

datoController.crearDato  

)

router.get('/',
auth,
    datoController.obtenerDatos)


router.put('/:id',
auth,
datoController.actualizarDato)


router.delete('/:id',
auth,
datoController.eliminarDato
)

module.exports= router