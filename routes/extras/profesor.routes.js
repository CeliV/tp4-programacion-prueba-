const { Router } = require('express')
const {
  getProfesorAll,
  getProfesorById,
  postNewProfesor,
  putProfesorByLegajo,
  deleteProfesorByLegajo
} = require('../../controllers/profesor.controller')

const rutas = Router()

rutas.get('/', getProfesorAll)           // trae todos los profesores
rutas.get('/:legajo', getProfesorById)   // trae uno por legajo
rutas.post('/', postNewProfesor)         // crea un nuevo profesor
rutas.put('/:legajo', putProfesorByLegajo)    // edita un profesor
rutas.delete('/:legajo', deleteProfesorByLegajo) // elimina un profesor

module.exports = rutas