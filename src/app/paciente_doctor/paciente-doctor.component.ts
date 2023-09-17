import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Persona } from '../model/paciente_doctor.model';
import { DataTableDirective } from 'angular-datatables';
import { PersonaService } from '../service/paciente_doctor.service'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-persona',
  templateUrl: './paciente-doctor.component.html',
  styleUrls: ['./paciente-doctor.component.css']
})
export class PersonaComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | undefined;
  dtTrigger: Subject<any> = new Subject<any>();
  nuevaPersona: Persona = new Persona(); // Inicializa nuevaPersona sin argumentos
  personas: Persona[] = [];
  constructor(private personaService: PersonaService) {}

  dtOptions:DataTables.Settings={}
  ngOnInit(): void {
    this.dtOptions = {
        pagingType: 'full_numbers',
        language: {
          url:'//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
        },
        searching: true, // Habilita la búsqueda
        // Otras opciones de configuración si las tienes
        columns: [
          { searchable: true }, // Columna 0 (nombre): Habilita la búsqueda
          { searchable: true }, // Columna 1 (apellido): Habilita la búsqueda
          { searchable: false }, // Columna 2 (teléfono): Habilita la búsqueda
          { searchable: false }, // Columna 3 (email): Habilita la búsqueda
          { searchable: false }, // Columna 4 (cedula): Habilita la búsqueda
          { searchable: false }, // Columna 5 (Es doctor?): Habilita la búsqueda
          { searchable: false }, // Columna 6 (Acciones): No es una columna ordenable
        ],
    }
    this.cargarPersonas();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        url:'//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
      },
      searching: true, // Habilita la búsqueda
      // Otras opciones de configuración si las tienes
      columns: [
        { searchable: true }, // Columna 0 (nombre): Habilita la búsqueda
        { searchable: true }, // Columna 1 (apellido): Habilita la búsqueda
        { searchable: true }, // Columna 2 (teléfono): Habilita la búsqueda
        { searchable: true }, // Columna 3 (email): Habilita la búsqueda
        { searchable: true }, // Columna 4 (cedula): Habilita la búsqueda
        { searchable: false }, // Columna 5 (Es doctor?): Habilita la búsqueda
        { searchable: false }, // Columna 6 (Acciones): No es una columna ordenable
      ],
  }
    this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destruye la tabla primero
      dtInstance.destroy();
      // Llama a dtTrigger para volver a renderizar
      this.dtTrigger.next(this.dtOptions);
    });
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
      this.rerender();

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
