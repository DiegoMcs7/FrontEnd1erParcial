import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reserva, ReservaPutBody } from '../../model/reserva.model';
import { ReservaService } from '../../service/reserva.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Persona } from '../../model/paciente_doctor.model';
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
  fecha: Fecha = new Fecha();
  horaInicio: Hora = new Hora();
  horaFin: Hora = new Hora();
  flagAsistio: boolean = true;
  doctor: Persona = new Persona();
  paciente: Persona = new Persona();
  nuevaPersona: Persona = new Persona();
  edit_id: number = 0; // Campo edit_id como variable local

  constructor(private reservaService: ReservaService, private personaService: PersonaService) { }

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
      this.cargarReservas();
    });
  }

  toggleFlag() {
    this.flagAsistio = !this.flagAsistio;
  }

  editarReserva(reserva: Reserva): void {
    this.edit_id = reserva.idReserva;
    reserva.editFieldName=true;
  }

  guardarEdicionCambios(reserva: Reserva): void {
    this.reservaService.editarReserva(this.edit_id, reserva);
    reserva.editFieldName=true;
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
