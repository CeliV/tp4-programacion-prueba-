const validateInputMateria = (req, res, next) => {
    const { idMateria, nombre, cuatrimestre } = req.body
    const error = []

    if (idMateria && typeof idMateria !== 'string') {
        error.push('El idMateria debe ser un texto válido.')
    }
    if (nombre && typeof nombre !== 'string') {
        error.push('El nombre debe ser un texto válido.')
    }
    if (cuatrimestre && typeof cuatrimestre !== 'number') {
        error.push('El cuatrimestre debe ser un número válido.')
    }

    if (error.length > 0) {
        return res.status(400).json({ error })
    }
    next()
}

module.exports = { validateInputMateria }

// dao y dto buscarlo trabajo con capas 