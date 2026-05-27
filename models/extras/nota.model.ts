class NotaModel {
    private id: number
    private legajoAlumno: number
    private materia: string
    private nota: number
    private fecha: string

    constructor (
        id: number,
        legajoAlumno: number,
        materia: string,
        nota: number,
        fecha: string = new Date().toISOString().split('T')[0]
    ) {
        this.id = id
        this.legajoAlumno = legajoAlumno
        this.materia = materia
        this.nota = nota
        this.fecha = fecha
    }

    public getId (): number {
        return this.id
    }

    public getLegajoAlumno (): number {
        return this.legajoAlumno
    }

    public getMateria (): string {
        return this.materia
    }

    public setMateria (materia: string): void {
        this.materia = materia
    }

    public getNota (): number {
        return this.nota
    }

    public setNota (nota: number): void {
        this.nota = nota
    }

    public getFecha (): string {
        return this.fecha
    }

    public getAllAttributes () {
        return {
        id: this.id,
        legajoAlumno: this.legajoAlumno,
        materia: this.materia,
        nota: this.nota,
        fecha: this.fecha
        }
    }
    }

module.exports = { NotaModel }