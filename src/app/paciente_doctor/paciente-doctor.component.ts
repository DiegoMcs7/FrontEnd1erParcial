import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Persona } from '../model/paciente_doctor.model';
import { DataTableDirective } from 'angular-datatables';
import { PersonaService } from '../service/paciente_doctor.service'
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-persona',
  templateUrl: './paciente-doctor.component.html',
  styleUrls: ['./paciente-doctor.component.css']
})
export class PersonaComponent implements AfterViewInit, OnDestroy, OnInit {
  nuevaPersona: Persona = new Persona(); // Inicializa nuevaPersona sin argumentos
  personas: Persona[] = [];
  personaEditada: Persona = new Persona();
  edit_id: number = 0; // Campo edit_id como variable local
  editMode = false; // Modo de edición
  constructor(private personaService: PersonaService,private toastr: ToastrService) {}
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | undefined;
  dtOptions:DataTables.Settings={}
  dtTrigger: Subject<any> = new Subject<any>();
  min: number = 0;
  max: number = 0;
  max_id: number = 0;

  ngOnInit(): void {
    this.dtOptions = {
        pagingType: 'full_numbers',
        language: {
          url:'//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
        },
        searching: true,
        columns: [
          { searchable: true },
          { searchable: true },
          { searchable: true },
          { searchable: true },
          { searchable: true },
          { searchable: true },
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
    this.personaService.getPersonas().subscribe((personas: Persona[]) => {
      this.personas = personas;
      this.max_id= this.personas.length;
      this.rerender();
    });
  }

  agregarPersona(): void {
    this.max_id= this.max_id + 1;
    this.nuevaPersona.idPersona = this.max_id;
    if (
      this.nuevaPersona.nombre &&
      this.nuevaPersona.apellido &&
      this.nuevaPersona.telefono &&
      this.nuevaPersona.email &&
      this.nuevaPersona.cedula
    ) {
      this.personaService.agregarPersona(this.nuevaPersona);
      this.toastr.success('Se agregó una persona');
      this.nuevaPersona = new Persona();
    }
  }

  editarPersona(persona: Persona): void {
    this.edit_id = persona.idPersona;
    persona.editFieldName=true;
    this.rerender();
  }

  guardarEdicionCambios(persona: Persona): void {
    this.personaService.editarPersona(this.edit_id, persona);
    this.toastr.success('Se editó una persona');
    persona.editFieldName=true;
    this.rerender();
  }

  cancelarEdicion(): void {
    this.editMode = false;
    this.personaEditada = new Persona();
  }

  eliminarPersona(persona: Persona): void {
    this.personaService.eliminarPersona(persona.idPersona);
    this.toastr.success('Se eliminó una persona');
    this.rerender();
  }

}
