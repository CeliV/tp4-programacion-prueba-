const fs = require('fs').promises
const { ProfesorModel } = require('../models/extras/profesor.model')

// GET /profesores - trae todos los profesores
const getProfesorAll = async (req, res) => {
    try {
        const data = await fs.readFile('./data/extras/sys-profesores.json')
        const profesores = JSON.parse(data)
        return res.status(200).json(profesores)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'No se pudieron obtener los profesores' })
    }
    }

    // GET /profesores/:legajo - trae un profesor por legajo
    const getProfesorById = async (req, res) => {
    try {
        const data = await fs.readFile('./data/extras/sys-profesores.json', 'utf8')
        const profesores = JSON.parse(data)
        const { legajo } = req.params

        const profesor = profesores.find((p) => p.legajo === Number(legajo))

        if (!profesor) {
        return res.status(404).json({ msg: `No existe el profesor con legajo ${legajo}` })
        }

        return res.status(200).json(profesor)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: `No se pudo obtener el profesor con legajo n° ${legajo}` })
    }
    }

    // POST /profesores - crea un nuevo profesor
    const postNewProfesor = async (req, res) => {
    try {
        const { nombre, apellido, email, materia } = req.body

        if (!nombre || !apellido || !email || !materia) {
        return res.status(400).json({ msg: 'Faltan datos obligatorios: nombre, apellido, email, materia' })
        }

        const data = await fs.readFile('./data/extras/sys-profesores.json', 'utf8')
        const profesores = JSON.parse(data)

        const legajos = profesores.map((p) => p.legajo)
        const nuevoLegajo = Math.max(...legajos) + 1

        const nuevoProfesor = new ProfesorModel(nombre, apellido, email, nuevoLegajo, materia)
        const profesorAtributos = nuevoProfesor.getAllAttributes()

        profesores.push(profesorAtributos)
        await fs.writeFile('./data/extras/sys-profesores.json', JSON.stringify(profesores, null, 2))

        return res.status(201).json({
        msg: `Se agregó el profesor con legajo n° ${nuevoLegajo}`,
        profesorAtributos
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'No se pudo dar de alta el profesor' })
    }
    }

    // PUT /profesores/:legajo - edita un profesor existente
    const putProfesorByLegajo = async (req, res) => {
    const { legajo } = req.params
    try {
        const { nombre, apellido, email, materia, isActive } = req.body

        const data = await fs.readFile('./data/extras/sys-profesores.json', 'utf8')
        const profesores = JSON.parse(data)

        const index = profesores.findIndex((p) => p.legajo === Number(legajo))

        if (index === -1) {
        return res.status(404).json({ msg: `No se encontró el profesor con legajo n° ${legajo}` })
        }

        const profesorEncontrado = profesores[index]

        const profesorModificado = new ProfesorModel(
        profesorEncontrado.nombre,
        profesorEncontrado.apellido,
        profesorEncontrado.email,
        profesorEncontrado.legajo,
        profesorEncontrado.materia,
        profesorEncontrado.isActive
        )

        if (nombre) profesorModificado.setNombre(nombre)
        if (apellido) profesorModificado.setApellido(apellido)
        if (email) profesorModificado.setEmail(email)
        if (materia) profesorModificado.setMateria(materia)
        if (isActive !== undefined) profesorModificado.setIsActive(isActive)

        profesores[index] = profesorModificado.getAllAttributes()
        await fs.writeFile('./data/extras/sys-profesores.json', JSON.stringify(profesores, null, 2))

        return res.status(200).json({
        msg: `Se modificó el profesor con legajo n° ${legajo}`,
        profesor: profesores[index]
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: `No se pudieron modificar los datos del profesor con legajo n° ${legajo}` })
    }
    }

    // DELETE /profesores/:legajo - elimina un profesor
    const deleteProfesorByLegajo = async (req, res) => {
    try {
        const { legajo } = req.params

        const data = await fs.readFile('./data/extras/sys-profesores.json', 'utf8')
        const profesores = JSON.parse(data)

        const index = profesores.findIndex((p) => p.legajo === Number(legajo))

        if (index === -1) {
        return res.status(404).json({ msg: `No se encontró el profesor con legajo n° ${legajo}` })
        }

        const profesorEliminado = profesores[index]
        profesores.splice(index, 1)
        await fs.writeFile('./data/extras/sys-profesores.json', JSON.stringify(profesores, null, 2))

        return res.status(200).json({
        msg: `Se eliminó el profesor con legajo n° ${legajo}`,
        profesor: profesorEliminado
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'No se pudo eliminar el profesor' })
    }
    }

    module.exports = { getProfesorAll, getProfesorById, postNewProfesor, putProfesorByLegajo, deleteProfesorByLegajo }