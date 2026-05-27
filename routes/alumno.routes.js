const { Router } = require('express')
const {
  getAlumnoAll,
  getAlumnoById,
  postNewAlumno,
  putAlumnoByLegajo,
  deleteAlumnoByLegajo
} = require('../controllers/alumno.controller')
const {
  validateInputAlumno
} = require('../middleware/alumno-validator.middleware')

const rutas = Router()

rutas.get('/', getAlumnoAll)
rutas.get('/:legajo', getAlumnoById)
rutas.post('/', validateInputAlumno, postNewAlumno)
rutas.put('/:legajo', validateInputAlumno, putAlumnoByLegajo)
rutas.delete('/:legajo', deleteAlumnoByLegajo)

module.exports = rutas
