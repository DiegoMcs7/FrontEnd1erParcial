import { Component, OnInit } from '@angular/core';
import { Persona } from '../model/paciente_doctor.model';
import { PersonaService } from '../service/paciente_doctor.service'

@Component({
  selector: 'app-persona',
  templateUrl: './paciente-doctor.component.html',
  styleUrls: ['./paciente-doctor.component.css']
})
export class PersonaComponent implements OnInit {
  nuevaPersona: Persona = new Persona(); // Inicializa nuevaPersona sin argumentos
  personas: Persona[] = [];

  constructor(private personaService: PersonaService) {}

  ngOnInit(): void {
    this.cargarPersonas();
  }

  cargarPersonas(): void {
    this.personas = this.personaService.getPersonas();
  }

  agregarPersona(): void {
    if (
      this.nuevaPersona.nombre &&
      this.nuevaPersona.apellido &&
      this.nuevaPersona.telefono &&
      this.nuevaPersona.email &&
      this.nuevaPersona.cedula
    ) {
      this.personaService.agregarPersona(this.nuevaPersona);
      this.nuevaPersona = new Persona(); // Limpia los campos del formulario después de agregar
      this.cargarPersonas();
    }
  }

  editarPersona(persona: Persona): void {
    if (persona.idPersona !== undefined) {
      this.personaService.editarPersona(persona.idPersona, persona);
      this.cargarPersonas();
    }
  }

  eliminarPersona(id: number): void {
    this.personaService.eliminarPersona(id);
    this.cargarPersonas();
  }
}
