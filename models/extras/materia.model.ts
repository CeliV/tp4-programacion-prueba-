class MateriaModel {
    private idMateria: string
    private nombre: string
    private cuatrimestre: number

    constructor (
        idMateria: string,
        nombre: string,
        cuatrimestre: number
    ) {
        this.idMateria = idMateria
        this.nombre = nombre
        this.cuatrimestre = cuatrimestre
    }

    public getIdMateria (): string {
        return this.idMateria
    }

    public getNombre (): string {
        return this.nombre
    }

    public setNombre (nombre: string): void {
        this.nombre = nombre
    }

    public getCuatrimestre (): number {
        return this.cuatrimestre
    }

    public setCuatrimestre (cuatrimestre: number): void {
        this.cuatrimestre = cuatrimestre
    }

    public getAllAttributes () {
        return {
        idMateria: this.idMateria,
        nombre: this.nombre,
        cuatrimestre: this.cuatrimestre
    }
    }
}

module.exports = { MateriaModel }