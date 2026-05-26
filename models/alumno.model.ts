// Define cómo es un alumno con tipos (number, string, boolean)
/*El método validar recibe los datos del body y verifica que estén bien. 
Si algo falla devuelve un mensaje de error, si todo está bien devuelve null*/
class Alumno {
    legajo: number
    nombre: string
    apellido: string
    email: string
    fechaAlta: string
    modificacion: string
    isActive: boolean

    constructor (
        legajo: number,
        nombre: string,
        apellido: string,
        email: string,
        fechaAlta: string,
        modificacion: string,
        isActive: boolean
    ) {
        this.legajo = legajo
        this.nombre = nombre
        this.apellido = apellido
        this.email = email
        this.fechaAlta = fechaAlta
        this.modificacion = modificacion
        this.isActive = isActive
    }

    // valida que los campos obligatorios no estén vacíos
    static validar (data: any): string | null {
        if (!data.nombre || typeof data.nombre !== 'string') {
        return 'El nombre es obligatorio y debe ser texto'
        }
        if (!data.apellido || typeof data.apellido !== 'string') {
        return 'El apellido es obligatorio y debe ser texto'
        }
        if (!data.email || typeof data.email !== 'string') {
        return 'El email es obligatorio y debe ser texto'
        }
        if (!data.email.includes('@')) {
        return 'El email no es válido'
        }
        return null
    }
    }

module.exports = Alumno