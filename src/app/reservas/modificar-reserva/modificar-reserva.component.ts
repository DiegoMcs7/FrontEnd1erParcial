import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reserva, ReservaPutBody} from '../../model/reserva.model';
import { ReservaService } from '../../service/reserva.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Persona } from '../../model/paciente_doctor.model';
import { ToastrService } from 'ngx-toastr';
import { PersonaService } from 'src/app/service/paciente_doctor.service';
class Hora {
  hora!: number;
  minuto: number = 0;
}
class Fecha {
  year: number;
  month: number;
  day: number;
  constructor() {
    const today = new Date();
    this.day = today.getDate();
    this.month = today.getMonth() + 1;
    this.year = today.getFullYear();
  }
}

@Component({
  selector: 'app-modificar-reserva',
  templateUrl: './modificar-reserva.component.html',
  styleUrls: ['./modificar-reserva.component.css']
})
export class ModificarReservaComponent implements  OnInit  {

  public data: Reserva[] = [];
  reservas: Reserva[] = []
  personas: Persona[] = [];
  reserva: Reserva = new Reserva();
  reserva1: Reserva | undefined
  fecha: Fecha = new Fecha();
  horaInicio: Hora = new Hora();
  horaFin: Hora = new Hora();
  flagAsistio: boolean = true;
  doctor: Persona = new Persona();
  paciente: Persona = new Persona();
  nuevaPersona: Persona = new Persona();
  persona1: Persona = new Persona();
  persona2: Persona = new Persona();
  edit_id: number = 0; // Campo edit_id como variable local

  constructor(private reservaService: ReservaService, private personaService: PersonaService, private route: ActivatedRoute,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.cargarPersonas();
    this.cargarReservas();
  }
  cargarPersonas(): void {
    this.personaService.getPersonas().subscribe((data: Persona[]) => {
      this.personas = data;
    });
  }
  cargarReservas(): void {
    this.reservaService.getReservas().subscribe((reservas: Reserva[]) => {
      this.reservas = reservas;
      const routeParams = this.route.snapshot.paramMap;
      const reservaIdFromRoute = Number(routeParams.get('id'));
      console.log(reservaIdFromRoute);
      this.reserva1 = this.reservas.find((reserva2) => reservaIdFromRoute === reserva2.idReserva);
      console.log(this.reserva1);
      if (this.reserva1) {
        this.reserva = this.reserva1;
      }
      const hora_inicio = this.reserva.horaInicio.split(":");
      const hora_final = this.reserva.horaFin.split(":");
      const fecha = this.reserva.fecha.split("/");

      this.horaInicio.hora = +hora_inicio[0];
      this.horaInicio.minuto = +hora_inicio[1];

      this.horaFin.hora = +hora_final[0];
      this.horaFin.minuto = +hora_final[1];

      this.fecha.year = parseInt(fecha[0]);
      this.fecha.month = parseInt(fecha[1]);
      this.fecha.day = parseInt(fecha[2]);

      this.persona1 = this.reserva.idDoctor
      this.persona2 = this.reserva.idPaciente
    });
  }

  toggleFlag() {
    this.reserva.flagAsistio = !this.reserva.flagAsistio;
  }

  editarReserva(reserva: Reserva): void {
    this.edit_id = reserva.idReserva;
    reserva.editFieldName=true;
  }

  guardarEdicionCambios(reserva: Reserva): void {
    this.personaService.getPersonas().subscribe((personas: Persona[]) => {
      const fecha = this.fecha;
      const fechaStr = `${fecha.year}/${fecha.month}/${fecha.day}`;
      const horaInicio = this.horaInicio;
      const horaInicioStr = `${horaInicio.hora}:00`;
      const horaFin = this.horaFin;
      const horaFinStr = `${horaFin.hora}:00`;
      const doctor_edit = personas.find(persona => persona.idPersona === reserva.idDoctor?.idPersona);
      const paciente_edit = personas.find(persona => persona.idPersona === reserva.idPaciente?.idPersona);
      if (doctor_edit && paciente_edit) {
        this.reservaService.editarReserva(reserva.idReserva, reserva, doctor_edit, paciente_edit, fechaStr,horaFinStr,horaInicioStr);
        this.toastr.success('Se editó una reserva');
        reserva.editFieldName = true;
      } else {
        console.log('No se encontró un doctor o paciente válido.');
      }
    });
  }

  getDateString() {
    return `${this.fecha.year}${this.fecha.month <= 9 ? '0' : ''}${this.fecha.month}${this.fecha.day <= 9 ? '0' : ''}${this.fecha.day}`;
  }

  onDateChange() {
    this.doctor.idPersona, this.getDateString();
  }

  cambioFin(): string {
    this.horaInicio.hora = this.horaFin.hora - 1;
    return `${this.horaInicio.hora <= 9 ? '0' : ''}${this.horaInicio.hora}${this.horaInicio.minuto <= 9 ? '0' : ''}${this.horaInicio.minuto}`;
  }

  cambioInicio(): string {
    this.horaFin.hora = this.horaInicio.hora + 1;
    return `${this.horaFin.hora <= 9 ? '0' : ''}${this.horaFin.hora}${this.horaFin.minuto <= 9 ? '0' : ''}${this.horaFin.minuto}`;
  }

}
