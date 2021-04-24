const express = require('express')
const router = express.Router()
const partidoController = require('../controllers/partidoController')
const auth = require ('../middleware/auth')
const {check} = require('express-validator')
router.post('/',
    auth,
    [
        check('fecha','La fecha del partido es obligatoria').not().isEmpty(),
        check('hora','La hora del partido es obligatoria').not().isEmpty()
    ],
    partidoController.crearPartido
)

router.get('/',
    auth,
    partidoController.obtenerPartidos 
)

router.put('/:id',
auth,
    [
        check('fecha','La fecha del partido es obligatoria').not().isEmpty(),
        check('hora','La hora del partido es obligatoria').not().isEmpty()
    ],

partidoController.actualizarPartido
)

router.delete('/:id',
    auth,
    partidoController.eliminarPartido
)

module.exports= router