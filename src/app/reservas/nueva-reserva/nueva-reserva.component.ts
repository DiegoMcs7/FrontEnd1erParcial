import { Component, OnInit } from '@angular/core';
import { Persona } from '../../model/paciente_doctor.model';
import { PersonaService } from '../../service/paciente_doctor.service'
import { Reserva, ReservaPostBody } from '../../model/reserva.model';
import { ReservaService } from '../../service/reserva.service';

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
  selector: 'app-nueva-reserva',
  templateUrl: './nueva-reserva.component.html',
  styleUrls: ['./nueva-reserva.component.css']
})
export class NuevaReservaComponent implements OnInit {
  public data: Reserva[] = [];
  public hola: Persona[] = [];
  personas: Persona[] = [];

  public columns = ["Fecha","Hora inicio","Hora fin","Doctor","Paciente","Acciones"];
  nuevaReserva: Reserva = new Reserva();
  reservas: Reserva[] = []
  reserva: Reserva = new Reserva();
  doctor: Persona = new Persona();
  paciente: Persona = new Persona();
  horaInicio: Hora = new Hora();
  horaFin: Hora = new Hora();
  nuevaPersona: Persona = new Persona();
  fecha: Fecha = new Fecha();


  constructor(private reservaService: ReservaService, private personaService: PersonaService) { }

  ngOnInit(): void {
    this.cargarPersonas();
    this.cargarReservas();
  }

  getDateString() {
    return `${this.fecha.year}${this.fecha.month <= 9 ? '0' : ''}${this.fecha.month}${this.fecha.day <= 9 ? '0' : ''}${this.fecha.day}`;
  }

  onDateChange() {
    this.doctor.idPersona, this.getDateString();
  }

  cargarPersonas(): void {
    this.personaService.getPersonas().subscribe((data: Persona[]) => {
      this.personas = data;
    });
  }

  cargarReservas(): void {
    this.reservaService.getReservas().subscribe((reservas: Reserva[]) => {
      this.reservas = reservas;
    });
  }

  agregarReserva(): void {
    this.nuevaReserva.fecha = this.getDateString();
    this.nuevaReserva.idDoctor = this.doctor;
    this.nuevaReserva.idPaciente = this.paciente;
    this.nuevaReserva.horaInicio = this.cambioInicio(); // Llama a la función para obtener la hora de inicio
    this.nuevaReserva.horaFin = this.cambioFin(); // Llama a la función para obtener la hora de fin

    if (this.nuevaReserva.idDoctor && this.nuevaReserva.idPaciente) {
      this.reservaService.agregarReserva(this.nuevaReserva)
        console.log('Reserva agregada con éxito.');
        this.nuevaReserva = new Reserva();
        this.cargarReservas();
    } else {
      console.error('Asegúrate de seleccionar un doctor y un paciente.');
    }
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
