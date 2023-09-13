import { Injectable } from '@angular/core';
import { Persona } from '../model/paciente_doctor.model';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  private personas: Persona[] = [];
  private nextId: number = 1;

  agregarPersona(persona: Persona): void {
    persona.idPersona = this.nextId++;
    this.personas.push(persona);
  }

  getPersonas(): Persona[] {
    return this.personas;
  }

  editarPersona(id: number, nuevaPersona: Persona): void {
    const index = this.personas.findIndex((p) => p.idPersona === id);
    if (index !== -1) {
      this.personas[index] = nuevaPersona;
    }
  }

  eliminarPersona(id: number): void {
    this.personas = this.personas.filter((p) => p.idPersona !== id);
  }
}
