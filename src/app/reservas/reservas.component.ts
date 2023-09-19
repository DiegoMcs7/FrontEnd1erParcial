import { Component, OnInit } from '@angular/core';
import { Persona } from '../model/paciente_doctor.model';
import { PersonaService } from '../service/paciente_doctor.service'
import { Reserva } from '../model/reserva.model';
import { ReservaService } from '../service/reserva.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservaComponent implements OnInit {
  public columns = ["Fecha","Hora inicio","Hora fin","Doctor","Paciente","Acciones"];
  public data: Reserva[] = [];
  reservas: Reserva[] = [];
  personas: Persona[] = [];
  personaSeleccionada1: number | undefined;
  personaSeleccionada2: number | undefined;
  doctor: Persona = new Persona();
  paciente: Persona = new Persona();
  constructor(private reservaService: ReservaService, private personaService: PersonaService) {}

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
    this.reservas = [];
    this.reservaService.getReservas().subscribe((reservas: Reserva[]) => {
      this.reservas = reservas;
    });
  }

  cancelarReserva(reserva: Reserva) {
    // Convierte el ID de la reserva a una cadena
    const idReservaString = reserva.idReserva.toString();
    // Llama al servicio para actualizar el estado de la reserva
    this.reservaService.cancelarReserva(idReservaString)

  }

  seleccionarDoctor(doctor: Persona){
    this.doctor = doctor
    this.doctor.fullName = doctor.nombre + " " + doctor.apellido;
  }

  seleccionarPaciente(paciente: Persona){
    this.paciente = paciente
    this.paciente.fullName = paciente.nombre + " " + paciente.apellido;
  }

}
