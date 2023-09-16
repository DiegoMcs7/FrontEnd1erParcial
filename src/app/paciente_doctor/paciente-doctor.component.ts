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
  dtoptions:DataTables.Settings={}
  ngOnInit(): void {
    this.dtoptions = {
        pagingType: 'full_numbers',
        order: [[1, 'desc']], // Esto ordenará la columna 1 de mayor a menor por defecto
        searching: true, // Habilita la búsqueda
        // Otras opciones de configuración si las tienes
        columns: [
          { searchable: true }, // Columna 0 (nombre): Habilita la búsqueda
          { searchable: true }, // Columna 1 (apellido): Habilita la búsqueda
          { searchable: true }, // Columna 2 (teléfono): Habilita la búsqueda
          { searchable: true }, // Columna 3 (email): Habilita la búsqueda
          { searchable: true }, // Columna 4 (cedula): Habilita la búsqueda
          { searchable: true }, // Columna 5 (Es doctor?): Habilita la búsqueda
          { searchable: false }, // Columna 6 (Acciones): No es una columna ordenable
        ],
    }
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
