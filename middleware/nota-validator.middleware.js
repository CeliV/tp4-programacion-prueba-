const validateInputNota = (req, res, next) => {
    const { legajoAlumno, materia, nota, fecha } = req.body
    const error = []

    if (legajoAlumno && typeof legajoAlumno !== 'number') {
        error.push('El legajoAlumno debe ser un número válido.')
    }
    if (materia && typeof materia !== 'string') {
        error.push('La materia debe ser un texto válido.')
    }
    if (nota && typeof nota !== 'number') {
        error.push('La nota debe ser un número válido.')
    }
    if (fecha && typeof fecha !== 'string') {
        error.push('La fecha debe ser un texto válido.')
    }

    if (error.length > 0) {
        return res.status(400).json({ error })
    }
    next()
}

module.exports = { validateInputNota }