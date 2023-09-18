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
  nuevaPersona: Persona = new Persona(); // Inicializa nuevaPersona sin argumentos
  personas: Persona[] = [];
  personaEditada: Persona = new Persona();
  editMode = false; // Modo de edición
  constructor(private personaService: PersonaService) {}
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | undefined;
  dtOptions:DataTables.Settings={}
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.dtOptions = {
        pagingType: 'full_numbers',
        language: {
          url:'//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
        },
        searching: true,
        columns: [
          { searchable: false },
          { searchable: true },
          { searchable: true },
          { searchable: false },
          { searchable: false },
          { searchable: false },
          { searchable: false },
          { searchable: false },
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
    this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next(this.dtOptions);
    });
  }

  cargarPersonas(): void {
    this.personas = [];
    this.personaService.getPersonas().subscribe((personas: Persona[]) => {
      this.personas = personas;
      this.rerender();
    });
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
      this.nuevaPersona = new Persona();
      this.cargarPersonas();
      this.rerender();
    }
  }

  editarPersona(persona: Persona): void {
    if (persona.idPersona !== undefined) {
      this.editMode = true; // Cambia al modo de edición
      this.personaEditada = { ...persona }; // Copia los datos de la persona a personaEditada
    }
  }

  guardarCambios(): void {
    // Lógica para guardar los cambios de la persona editada usando el servicio
    this.personaService.editarPersona(this.personaEditada.idPersona.toString(), this.personaEditada);
    this.editMode = false; // Vuelve al modo de agregar
    this.personaEditada = new Persona();
    this.cargarPersonas();
  }

  cancelarEdicion(): void {
    // Cancela la edición y vuelve al modo de agregar
    this.editMode = false;
    this.personaEditada = new Persona();
  }

  eliminarPersona(id: number): void {
    console.log(id);
    const idComoString = id.toString();
    this.personaService.eliminarPersona(idComoString);
    this.cargarPersonas();
  }
}
