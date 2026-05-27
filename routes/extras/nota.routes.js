const { Router } = require('express')
const {
  getNotaAll,
  getNotaById,
  postNewNota,
  putNotaById,
  deleteNotaById
} = require('../../controllers/nota.controller')

const rutas = Router()

rutas.get('/', getNotaAll)        // trae todas las notas
rutas.get('/:id', getNotaById)    // trae una por id
rutas.post('/', postNewNota)      // crea una nueva nota
rutas.put('/:id', putNotaById)    // edita una nota
rutas.delete('/:id', deleteNotaById) // elimina una nota

module.exports = rutas