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
  edit_id: number = 0; // Campo edit_id como variable local
  editMode = false; // Modo de edición
  constructor(private personaService: PersonaService) {}
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | undefined;
  dtOptions:DataTables.Settings={}
  dtTrigger: Subject<any> = new Subject<any>();
  min: number = 0;
  max: number = 0;

  ngOnInit(): void {
    
    this.dtOptions = {
        pagingType: 'full_numbers',
        language: {
          url:'//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
        },
        searching: true,
        responsive:true,
        columns: [
          { searchable: true },
          { searchable: true },
          { searchable: true },
          { searchable: true },
          { searchable: true },
          { searchable: true },
          { searchable: false },
          { searchable: false },
        ],
    }
    this.cargarPersonas();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  filterById() {
    
    this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
      console.log(dtInstance.columns().data())
      // Obtén los valores min y max del formulario
      const min = this.min;
      const max = this.max;
      this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
        console.log(dtInstance.columns(1));
        // Aplicar el filtro a la columna 'idPersona' (ajusta el índice según tu estructura de columna)
        // Construye la expresión regular
        const regExSearch = `^([${min}-${max}])$`;
        // Aplica el filtro a la columna que desees (cambia el índice según la columna)
        dtInstance.column(0).search(regExSearch, true, false).draw();     
      });
        // Realiza el filtro en la columna 'idPersona' de la tabla
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    $.fn['dataTable'].ext.search.pop();
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
    this.edit_id = persona.idPersona;
    persona.editFieldName=true;
    this.rerender();
  }

  guardarEdicionCambios(persona: Persona): void {
    this.personaService.editarPersona(this.edit_id, persona);
    persona.editFieldName=true;
    this.rerender();
  }

  cancelarEdicion(): void {
    // Cancela la edición y vuelve al modo de agregar
    this.editMode = false;
    this.personaEditada = new Persona();
  }

  eliminarPersona(persona: Persona): void {
    this.personaService.eliminarPersona(persona.idPersona);
    this.rerender();
  }

}
