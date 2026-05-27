const { Router } = require('express')
const {
  getMateriaAll,
  getMateriaById,
  postNewMateria,
  putMateriaById,
  deleteMateriaById
} = require('../../controllers/materia.controller')

const rutas = Router()

rutas.get('/', getMateriaAll)              // trae todas las materias
rutas.get('/:idMateria', getMateriaById)   // trae una por idMateria
rutas.post('/', postNewMateria)            // crea una nueva materia
rutas.put('/:idMateria', putMateriaById)   // edita una materia
rutas.delete('/:idMateria', deleteMateriaById) // elimina una materia

module.exports = rutas