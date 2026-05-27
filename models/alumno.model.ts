const { PersonaModel } = require('./persona.model')

class AlumnoModel extends PersonaModel {
    private legajo: number
    private fechaAlta: string
    private modificacion: string
    private isActive: boolean

    constructor (
        nombre: string,
        apellido: string,   
        email: string,
        legajo: number,
        fechaAlta: string = new Date().toISOString().split('T')[0],
        modificacion: string = new Date().toISOString().split('T')[0],
        isActive: boolean = true
    ) {
        super(nombre, apellido, email)
        this.legajo = legajo
        this.fechaAlta = fechaAlta
        this.modificacion = modificacion
        this.isActive = isActive
    }

    public getLegajo (): number {
        return this.legajo
    }

    public getIsActive (): boolean {
        return this.isActive
    }

    public setIsActive (status: boolean): void {
        this.isActive = status
    }

    public getModificacion (): string {
        return this.modificacion
    }

    public setModificacion (fecha: string): void {
        this.modificacion = fecha
    }

    public getAllAttributes () {
        return {
        legajo: this.legajo,
        nombre: this.nombre,
        apellido: this.apellido,
        email: this.email,
        fechaAlta: this.fechaAlta,
        modificacion: this.modificacion,
        isActive: this.isActive
        }
    }
    }

    module.exports = { AlumnoModel }