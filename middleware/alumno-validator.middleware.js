const validateInputAlumno = (req, res, next) => {
  const { nombre, apellido, email, isActive } = req.body

  const error = []

  if (nombre && typeof nombre !== 'string') {
    error.push('El nombre debe ser un texto válido.')
  }
  if (apellido && typeof apellido !== 'string') {
    error.push('El apellido debe ser un texto válido.')
  }
  if (email && typeof email !== 'string') {
    error.push('El email debe ser un formato de texto válido.')
  }
  if (isActive !== undefined && typeof isActive !== 'boolean') {
    error.push('El campo isActive debe ser un booleano (true/false).')
  }

  if (error.length > 0) {
    return res.status(400).json({ error })
  }

  next()
}

module.exports = { validateInputAlumno }
/*En Express, un middleware es una función que se ejecuta antes de llegar al 
controlador. Si los datos son válidos llama a next() que significa 
"segui adelante", si no devuelve el error directamente.*/