import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/paciente_doctor.model';
import { Reserva, ReservaPostBody } from 'src/app/model/reserva.model';
import { ReservaService } from 'src/app/service/reserva.service';

class Hora {
  hora!: number;
  minuto!: number;
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
  selector: 'app-nueva-reserva',
  templateUrl: './nueva-reserva.component.html',
  styleUrls: ['./nueva-reserva.component.css']
})
export class NuevaReservaComponent implements OnInit {
  public data: Reserva[] = [];
  public hola: Persona[] = [];
  personas: Persona[] = [];

  public columns = ["Fecha","Hora inicio","Hora fin","Doctor","Paciente","Acciones"];
  reserva: Reserva = new Reserva();
  doctor: Persona = new Persona();
  paciente: Persona = new Persona();
  horaInicio: Hora = new Hora();
  horaFin: Hora = new Hora();
  fecha: Fecha = new Fecha();
  config = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 1
  }
  next = "Siguiente"
  back = "Atras"
  constructor(private reservaService: ReservaService) { }

  ngOnInit(): void {
  }

  onChangeHoraInicio() {
    console.log(this.doctor);
  }

  getDateString() {
    return `${this.fecha.year}${this.fecha.month <= 9 ? '0' : ''}${this.fecha.month}${this.fecha.day <= 9 ? '0' : ''}${this.fecha.day}`;
  }

  onDateChange() {
    this.getReservas(this.doctor.idPersona, this.getDateString());
  }

  crearReserva() {

    let reservaBody = new ReservaPostBody();

    reservaBody.fechaCadena = this.getDateString();
    reservaBody.horaInicioCadena = `${this.horaInicio.hora <= 9 ? '0' : ''}${this.horaInicio.hora}${this.horaInicio.minuto <= 9 ? '0' : ''}${this.horaInicio.minuto}`;
    reservaBody.horaFinCadena = `${this.horaFin.hora}${this.horaFin.minuto}`;
    reservaBody.idPaciente = {
      idPersona: this.paciente.idPersona,
    };
    reservaBody.idDoctor = {
      idPersona: this.doctor.idPersona,
    };

    this.reservaService.postReserva(reservaBody).subscribe((data: Reserva) => console.log(JSON.stringify(data)));
  }

  seleccionarTurno(horaInicio: string, horaFin: string) {
    this.horaInicio.hora = Number(horaInicio.split(' ').pop()?.substring(0, 2));
    this.horaInicio.minuto = Number(horaInicio.split(' ').pop()?.substring(3, 5));
    this.horaFin.hora = Number(horaFin.split(' ').pop()?.substring(0, 2));
    this.horaFin.minuto = Number(horaFin.split(' ').pop()?.substring(3, 5));
  }

  getReservas(idDoctor: number, fecha: string) {
    let currentPage = this.config.currentPage;
    let itemsPerPage = this.config.itemsPerPage;

    let inicio = currentPage - 1;
    inicio = inicio * itemsPerPage;

    this.reservaService.getAgenda(idDoctor, fecha, itemsPerPage, inicio)
    .subscribe((data: Reserva[]) => {
     this.data = data;
    });
  }

  seleccionarDoctor(doctor: Persona){
    this.doctor = doctor
    this.doctor.fullName = doctor.nombre + " " + doctor.apellido;
    this.getReservas(doctor.idPersona, this.getDateString());
    console.log(`Se ha seleccionado el doctor con id = ${doctor.idPersona}`);
  }

  seleccionarPaciente(paciente: Persona){
    this.paciente = paciente
    this.paciente.fullName = paciente.nombre + " " + paciente.apellido;
  }

  pageChanged(event: number){
    this.config.currentPage = event;
  }

}
