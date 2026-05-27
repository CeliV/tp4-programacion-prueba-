const { PersonaModel } = require('../persona.model')

class ProfesorModel extends PersonaModel {
  private legajo: number
  private materia: string
  private isActive: boolean

  constructor(
    nombre: string,
    apellido: string,
    email: string,
    legajo: number,
    materia: string,
    isActive: boolean = true
  ) {
    super(nombre, apellido, email)
    this.legajo = legajo
    this.materia = materia
    this.isActive = isActive
  }

  public getLegajo(): number {
    return this.legajo
  }

  public getMateria(): string {
    return this.materia
  }

  public setMateria(materia: string): void {
    this.materia = materia
  }

  public getIsActive(): boolean {
    return this.isActive
  }

  public setIsActive(status: boolean): void {
    this.isActive = status
  }

  public getAllAttributes() {
    return {
      legajo: this.legajo,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      materia: this.materia,
      isActive: this.isActive
    }
  }
}

module.exports = { ProfesorModel }
export {}