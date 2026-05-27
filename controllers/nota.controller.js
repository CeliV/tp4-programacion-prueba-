const fs = require('fs').promises
const { NotaModel } = require('../models/extras/nota.model')

// GET /notas - trae todas las notas
const getNotaAll = async (req, res) => {
    try {
        const data = await fs.readFile('./data/extras/sys-notas.json')
        const notas = JSON.parse(data)
        return res.status(200).json(notas)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'No se pudieron obtener las notas' })
    }
    }

    // GET /notas/:id - trae una nota por id
    const getNotaById = async (req, res) => {
    try {
        const data = await fs.readFile('./data/extras/sys-notas.json', 'utf8')
        const notas = JSON.parse(data)
        const { id } = req.params

        const nota = notas.find((n) => n.id === Number(id))

        if (!nota) {
        return res.status(404).json({ msg: `No existe la nota con id ${id}` })
        }

        return res.status(200).json(nota)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: `No se pudo obtener la nota con id n° ${id}` })
    }
    }

    // POST /notas - crea una nueva nota
    const postNewNota = async (req, res) => {
    try {
        const { legajoAlumno, materia, nota } = req.body

        if (!legajoAlumno || !materia || nota === undefined) {
        return res.status(400).json({ msg: 'Faltan datos obligatorios: legajoAlumno, materia, nota' })
        }

        const data = await fs.readFile('./data/extras/sys-notas.json', 'utf8')
        const notas = JSON.parse(data)

        const ids = notas.map((n) => n.id)
        const nuevoId = Math.max(...ids) + 1

        const nuevaNota = new NotaModel(nuevoId, legajoAlumno, materia, nota)
        const notaAtributos = nuevaNota.getAllAttributes()

        notas.push(notaAtributos)
        await fs.writeFile('./data/extras/sys-notas.json', JSON.stringify(notas, null, 2))

        return res.status(201).json({
        msg: `Se agregó la nota con id n° ${nuevoId}`,
        notaAtributos
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'No se pudo dar de alta la nota' })
    }
    }

    // PUT /notas/:id - edita una nota existente
    const putNotaById = async (req, res) => {
    const { id } = req.params
    try {
        const { materia, nota } = req.body

        const data = await fs.readFile('./data/extras/sys-notas.json', 'utf8')
        const notas = JSON.parse(data)

        const index = notas.findIndex((n) => n.id === Number(id))

        if (index === -1) {
        return res.status(404).json({ msg: `No se encontró la nota con id n° ${id}` })
        }

        const notaEncontrada = notas[index]

        const notaModificada = new NotaModel(
        notaEncontrada.id,
        notaEncontrada.legajoAlumno,
        notaEncontrada.materia,
        notaEncontrada.nota,
        notaEncontrada.fecha
        )

        if (materia) notaModificada.setMateria(materia)
        if (nota !== undefined) notaModificada.setNota(nota)

        notas[index] = notaModificada.getAllAttributes()
        await fs.writeFile('./data/extras/sys-notas.json', JSON.stringify(notas, null, 2))

        return res.status(200).json({
        msg: `Se modificó la nota con id n° ${id}`,
        nota: notas[index]
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: `No se pudieron modificar los datos de la nota con id n° ${id}` })
    }
    }

    // DELETE /notas/:id - elimina una nota
    const deleteNotaById = async (req, res) => {
    try {
        const { id } = req.params

        const data = await fs.readFile('./data/extras/sys-notas.json', 'utf8')
        const notas = JSON.parse(data)

        const index = notas.findIndex((n) => n.id === Number(id))

        if (index === -1) {
        return res.status(404).json({ msg: `No se encontró la nota con id n° ${id}` })
        }

        const notaEliminada = notas[index]
        notas.splice(index, 1)
        await fs.writeFile('./data/extras/sys-notas.json', JSON.stringify(notas, null, 2))

        return res.status(200).json({
        msg: `Se eliminó la nota con id n° ${id}`,
        nota: notaEliminada
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'No se pudo eliminar la nota' })
    }
    }

    module.exports = { getNotaAll, getNotaById, postNewNota, putNotaById, deleteNotaById }