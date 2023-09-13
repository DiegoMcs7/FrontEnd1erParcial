import { Injectable } from '@angular/core';
import { Persona } from '../model/paciente_doctor.model';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  private personas: Persona[] = [];
  private nextId: number = 1;

  constructor() {}

  getPersonas(): Persona[] {
    return this.personas;
  }

  agregarPersona(nuevaPersona: Persona): void {
    nuevaPersona.idPersona = this.nextId++;
    this.personas.push(nuevaPersona);
  }

  editarPersona(id: number, nuevaPersona: Persona): void {
    const personaIndex = this.personas.findIndex(p => p.idPersona === id);
    if (personaIndex !== -1) {
      this.personas[personaIndex] = nuevaPersona;
    }
  }

  eliminarPersona(id: number): void {
    this.personas = this.personas.filter(p => p.idPersona !== id);
  }
}
