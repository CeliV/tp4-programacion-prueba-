const fs = require('fs').promises
const { MateriaModel } = require('../models/extras/materia.model')

// GET /materias - trae todas las materias
const getMateriaAll = async (req, res) => {
    try {
        const data = await fs.readFile('./data/extras/sys-materias.json')
        const materias = JSON.parse(data)
        return res.status(200).json(materias)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'No se pudieron obtener las materias' })
    }
    }

    // GET /materias/:idMateria - trae una materia por id
    const getMateriaById = async (req, res) => {
    try {
        const data = await fs.readFile('./data/extras/sys-materias.json', 'utf8')
        const materias = JSON.parse(data)
        const { idMateria } = req.params

        const materia = materias.find((m) => m.idMateria === idMateria)

        if (!materia) {
        return res.status(404).json({ msg: `No existe la materia con id ${idMateria}` })
        }

        return res.status(200).json(materia)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: `No se pudo obtener la materia con id ${idMateria}` })
    }
    }

    // POST /materias - crea una nueva materia
    const postNewMateria = async (req, res) => {
    try {
        const { idMateria, nombre, cuatrimestre } = req.body

        if (!idMateria || !nombre || !cuatrimestre) {
        return res.status(400).json({ msg: 'Faltan datos obligatorios: idMateria, nombre, cuatrimestre' })
        }

        const data = await fs.readFile('./data/extras/sys-materias.json', 'utf8')
        const materias = JSON.parse(data)

        const materiaExiste = materias.find((m) => m.idMateria === idMateria)
        if (materiaExiste) {
        return res.status(409).json({ msg: `Ya existe una materia con id ${idMateria}` })
        }

        const nuevaMateria = new MateriaModel(idMateria, nombre, cuatrimestre)
        const materiaAtributos = nuevaMateria.getAllAttributes()

        materias.push(materiaAtributos)
        await fs.writeFile('./data/extras/sys-materias.json', JSON.stringify(materias, null, 2))

        return res.status(201).json({
        msg: `Se agregó la materia con id ${idMateria}`,
        materiaAtributos
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'No se pudo dar de alta la materia' })
    }
    }

    // PUT /materias/:idMateria - edita una materia existente
    const putMateriaById = async (req, res) => {
    const { idMateria } = req.params
    try {
        const { nombre, cuatrimestre } = req.body

        const data = await fs.readFile('./data/extras/sys-materias.json', 'utf8')
        const materias = JSON.parse(data)

        const index = materias.findIndex((m) => m.idMateria === idMateria)

        if (index === -1) {
        return res.status(404).json({ msg: `No se encontró la materia con id ${idMateria}` })
        }

        const materiaEncontrada = materias[index]

        const materiaModificada = new MateriaModel(
        materiaEncontrada.idMateria,
        materiaEncontrada.nombre,
        materiaEncontrada.cuatrimestre
        )

        if (nombre) materiaModificada.setNombre(nombre)
        if (cuatrimestre) materiaModificada.setCuatrimestre(cuatrimestre)

        materias[index] = materiaModificada.getAllAttributes()
        await fs.writeFile('./data/extras/sys-materias.json', JSON.stringify(materias, null, 2))

        return res.status(200).json({
        msg: `Se modificó la materia con id ${idMateria}`,
        materia: materias[index]
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: `No se pudieron modificar los datos de la materia con id ${idMateria}` })
    }
    }

    // DELETE /materias/:idMateria - elimina una materia
    const deleteMateriaById = async (req, res) => {
    try {
        const { idMateria } = req.params

        const data = await fs.readFile('./data/extras/sys-materias.json', 'utf8')
        const materias = JSON.parse(data)

        const index = materias.findIndex((m) => m.idMateria === idMateria)

        if (index === -1) {
        return res.status(404).json({ msg: `No se encontró la materia con id ${idMateria}` })
        }

        const materiaEliminada = materias[index]
        materias.splice(index, 1)
        await fs.writeFile('./data/extras/sys-materias.json', JSON.stringify(materias, null, 2))

        return res.status(200).json({
        msg: `Se eliminó la materia con id ${idMateria}`,
        materia: materiaEliminada
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'No se pudo eliminar la materia' })
    }
    }

    module.exports = { getMateriaAll, getMateriaById, postNewMateria, putMateriaById, deleteMateriaById }