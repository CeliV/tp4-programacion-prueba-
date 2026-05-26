const fs = require('fs').promises

const Alumno = require('../models/alumno.model')
const getAlumnoAll = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8') //  lee el archivo JSON como texto
    const alumnos = JSON.parse(data) //  convierte ese texto en un array de JavaScript

    return res.status(200).json(alumnos) // responde con todos los alumnos
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ error: 'No se puedieron obtener los datos de los alumnos' })
    //  responde con error 500
  }
}

const getAlumnoById = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const { legajo } = req.params // agarra el legajo que vino en la URL

    const alumno = alumnos.find((a) => a.legajo === Number(legajo))
    /*busca en el array el alumno cuyo legajo coincida. El Number(legajo) es porque la URL siempre viene como texto
      y en el JSON es número,  entonces los convertimos para poder compararlos*/

    if (!alumno) {
      return res
        .status(404)
        .json({ msg: `No existe el alumno con el legajo ${legajo}` })
    }

    return res.status(200).json(alumno)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: `No se pudo obtener el detalle del alumno con legajo n° ${legajo}`
    })
  }
}

const createAlumno = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)
    const { nombre, apellido, email } = req.body // agarra los datos que mando el cliente en el cuerpo de la peticion

    const error = Alumno.validar(req.body)
    if (error) {
      return res.status(400).json({ msg: error })
    }

    const emailExiste = alumnos.find((a) => a.email === email)
    if (emailExiste) {
      return res.status(409).json({ msg: 'Ya existe un alumno con ese email' })
    } // validacion de que el mail no exista, si existe error de conflico 409

    const nuevoLegajo = alumnos[alumnos.length - 1].legajo + 1 // genera un nuevo legajo sumandole 1 al ultimo
    const hoy = new Date().toISOString().split('T')[0] // obtiene la fecha de hoy en formato 2025-05-25

    const nuevoAlumno = {
      legajo: nuevoLegajo,
      nombre,
      apellido,
      email,
      fechaAlta: hoy,
      modificacion: hoy,
      isActive: true
    }

    alumnos.push(nuevoAlumno) // agrega un nuevo alumno al array
    await fs.writeFile('./data/alumnos.json', JSON.stringify(alumnos, null, 2))

    return res.status(201).json(nuevoAlumno)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Error al crear el alumno' })
  }
}

const updateAlumno = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data) // lee el json
    const { legajo } = req.params // agarra el legajo de la url

    const index = alumnos.findIndex((a) => a.legajo === Number(legajo)) // busca la posicion del alumno en el array, si no lo encuentra devuelve -1

    if (index === -1) {
      return res
        .status(404)
        .json({ msg: `No existe el alumno con legajo ${legajo}` })
    }

    const { legajo: legajoIgnorado, ...cambios } = req.body // separa el legajo del resto asi que cuando entre un nuevo legajo en el body, lo ignora
    const hoy = new Date().toISOString().split('T')[0]

    alumnos[index] = { ...alumnos[index], ...cambios, modificacion: hoy } // combina los datos viejos con el nuevos cambios y actualiza la fecha
    await fs.writeFile('./data/alumnos.json', JSON.stringify(alumnos, null, 2)) // guarda el json

    return res.status(200).json(alumnos[index])
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Error al actualizar el alumno' })
  }
}

const deleteAlumno = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)
    const { legajo } = req.params

    const index = alumnos.findIndex((a) => a.legajo === Number(legajo)) // busca la posicion del alumno con finIndex

    if (index === -1) {
      // sie l elgaje es -1 responde con el error 404
      return res
        .status(404)
        .json({ msg: `No existe el alumno con legajo ${legajo}` })
    }

    alumnos.splice(index, 1) // elimina un elemento del array en esa posicion. 1 es que elimina solo uno
    await fs.writeFile('./data/alumnos.json', JSON.stringify(alumnos, null, 2)) // guarda el json actualizado

    return res
      .status(200)
      .json({ msg: `Alumno con legajo ${legajo} eliminado correctamente` })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Error al eliminar el alumno' })
  }
}

module.exports = {
  getAlumnoAll,
  getAlumnoById,
  createAlumno,
  updateAlumno,
  deleteAlumno
} // es la forma que Node.js exporta funcions de una archivo para que otros puedan ursarlas
