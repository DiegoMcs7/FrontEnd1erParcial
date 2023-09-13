import { Component, OnInit } from '@angular/core';
import { Persona } from '../model/paciente_doctor.model';
import { PersonaService } from '../service/paciente_doctor.service';

@Component({
  selector: 'app-persona',
  templateUrl: './paciente-doctor.component.html',
  styleUrls: ['./paciente-doctor.component.css']
})
export class PersonaComponent implements OnInit {
  nuevaPersona: Persona = new Persona();
  personas: Persona[] = [];

  constructor(private personaService: PersonaService) {
    // Inicializa los campos de nuevaPersona con valores predeterminados
    this.nuevaPersona.nombre = 'Nombre Predeterminado';
    this.nuevaPersona.apellido = 'Apellido Predeterminado';
    this.nuevaPersona.telefono = '1234567890';
    this.nuevaPersona.email = 'correo@example.com';
    this.nuevaPersona.cedula = '123456789';
    this.nuevaPersona.flag_es_doctor = false;
  }

  ngOnInit(): void {
    this.cargarPersonas();
  }

  cargarPersonas(): void {
    this.personas = this.personaService.getPersonas();
  }

  agregarPersona(): void {
    if (
      this.nuevaPersona.nombre.trim() !== '' &&
      this.nuevaPersona.apellido.trim() !== '' &&
      this.nuevaPersona.telefono.trim() !== '' &&
      this.nuevaPersona.email.trim() !== '' &&
      this.nuevaPersona.cedula.trim() !== ''
    ) {
      this.personaService.agregarPersona(this.nuevaPersona);
      this.nuevaPersona = new Persona(); // Crea una nueva instancia de Persona en blanco
      this.cargarPersonas();
    }
  }

  editarPersona(persona: Persona): void {
    this.personaService.editarPersona(persona);
    this.cargarPersonas();
  }

  eliminarPersona(id: number): void {
    this.personaService.eliminarPersona(id);
    this.cargarPersonas();
  }
}

