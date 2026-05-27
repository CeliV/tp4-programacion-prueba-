const fs = require('fs').promises
const { AlumnoModel } = require('../models/alumno.model')

// GET /alumnos - trae todos los alumnos
const getAlumnoAll = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)
    return res.status(200).json(alumnos)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'No se pudieron obtener los alumnos' })
  }
}

// GET /alumnos/:legajo - trae un alumno por legajo
const getAlumnoById = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)
    const { legajo } = req.params

    const alumno = alumnos.find((a) => a.legajo === Number(legajo))

    if (!alumno) {
      return res.status(404).json({ msg: `No existe el alumno con legajo ${legajo}` })
    }

    return res.status(200).json(alumno)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: `No se pudo obtener el detalle del alumno con legajo n° ${legajo}` })
  }
}

// POST /alumnos - crea un nuevo alumno
const postNewAlumno = async (req, res) => {
  try {
    const { nombre, apellido, email } = req.body

    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const legajos = alumnos.map((alumno) => alumno.legajo)
    const nuevoLegajo = Math.max(...legajos) + 1

    const nuevoAlumno = new AlumnoModel(nombre, apellido, email, nuevoLegajo)
    const alumnoAtributos = nuevoAlumno.getAllAttributes()

    alumnos.push(alumnoAtributos)
    await fs.writeFile('./data/alumnos.json', JSON.stringify(alumnos, null, 2))

    return res.status(201).json({
      msg: `Se agregó el alumno con legajo n° ${nuevoLegajo}`,
      alumnoAtributos
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'No se pudo dar de alta el alumno' })
  }
}

// PUT /alumnos/:legajo - edita un alumno existente
const putAlumnoByLegajo = async (req, res) => {
  const { legajo } = req.params
  try {
    const { nombre, apellido, email, isActive } = req.body

    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const index = alumnos.findIndex((alumno) => alumno.legajo === Number(legajo))

    if (index === -1) {
      return res.status(404).json({ msg: `No se encontró el alumno con legajo n° ${legajo}` })
    }

    const alumnoEncontrado = alumnos[index]

    const alumnoModificado = new AlumnoModel(
      alumnoEncontrado.nombre,
      alumnoEncontrado.apellido,
      alumnoEncontrado.email,
      alumnoEncontrado.legajo,
      alumnoEncontrado.fechaAlta,
      alumnoEncontrado.isActive
    )

    if (nombre) alumnoModificado.setNombre(nombre)
    if (apellido) alumnoModificado.setApellido(apellido)
    if (email) alumnoModificado.setEmail(email)
    if (isActive !== undefined) alumnoModificado.setIsActive(isActive)
    alumnoModificado.setModificacion(new Date().toISOString().split('T')[0])

    alumnos[index] = alumnoModificado.getAllAttributes()
    await fs.writeFile('./data/alumnos.json', JSON.stringify(alumnos, null, 2))

    return res.status(200).json({
      msg: `Se modificó el alumno con legajo n° ${legajo}`,
      alumno: alumnos[index]
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: `No se pudieron modificar los datos del alumno con legajo n° ${legajo}` })
  }
}

// DELETE /alumnos/:legajo - elimina un alumno
const deleteAlumnoByLegajo = async (req, res) => {
  try {
    const { legajo } = req.params

    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const index = alumnos.findIndex((alumno) => alumno.legajo === Number(legajo))

    if (index === -1) {
      return res.status(404).json({ msg: `No se encontró el alumno con legajo n° ${legajo}` })
    }

    const alumnoEliminado = alumnos[index]
    alumnos.splice(index, 1)
    await fs.writeFile('./data/alumnos.json', JSON.stringify(alumnos, null, 2))

    return res.status(200).json({
      msg: `Se eliminó el alumno con legajo n° ${legajo}`,
      alumno: alumnoEliminado
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'No se pudo eliminar el alumno' })
  }
}

module.exports = { getAlumnoAll, getAlumnoById, postNewAlumno, putAlumnoByLegajo, deleteAlumnoByLegajo }