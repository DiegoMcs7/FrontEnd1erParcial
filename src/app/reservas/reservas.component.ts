import { Component, OnInit } from '@angular/core';
import { listadatos } from '../model/datos';
import { Persona } from '../model/paciente_doctor.model';
import { PersonaService } from '../service/paciente_doctor.service'
import { Reserva } from '../model/reserva.model';
import { ReservaService } from '../service/reserva.service';


type Filtro = {
  fechaDesde ?: string,
  fechaHasta?: string,
  idDoctor?: number,
  idPaciente?: number,
};

@Component({
  selector: 'app-reserva',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservaComponent implements OnInit {
  public data: Reserva[] = [];
  public columns = ["Fecha","Hora inicio","Hora fin","Doctor","Paciente","Acciones"];
  config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 1
  }
  next = "Siguiente"
  back = "Atras"
  personas: Persona[] = [];
  personaSeleccionada: number | undefined;
  doctor: Persona = new Persona();
  paciente: Persona = new Persona();
  filtros: Filtro = {};
  constructor(private reservaService: ReservaService, private personaService: PersonaService) {
    const today = new Date();
    const todayString = `${today.getFullYear()}${today.getMonth() < 9 ? '0' : ''}${today.getMonth() + 1}${today.getDate() <= 9 ? '0' : ''}${today.getDate()}`;
    this.filtros.fechaDesde = todayString;
    this.filtros.fechaHasta = todayString;
  }
  

  ngOnInit(): void {
    this.getReservas();
    this.cargarPersonas();
  }

  cargarPersonas(): void {
    this.personas = this.personaService.getPersonas();
  }
  
  getReservas() {
    let currentPage = this.config.currentPage;
    let itemsPerPage = this.config.itemsPerPage;

    let inicio = currentPage - 1;
    inicio = inicio * itemsPerPage;

    this.reservaService.getReservas(this.filtros, itemsPerPage,inicio)
    .subscribe((data:listadatos<Reserva>) => {
     this.data = data.lista;
     this.config.totalItems = data.totalDatos;
    });
  }

  cancelarReserva(reserva: Reserva) {
    this.reservaService.cancelarReserva(reserva.idReserva)
    .subscribe((data:any) => console.log(`Reserva ${reserva.idReserva} cancelada!`));
    this.getReservas();
  }

  pageChanged(event: number){
    this.config.currentPage = event;
    this.getReservas()
  }

  seleccionarDoctor(doctor: Persona){
    this.doctor = doctor
    this.doctor.fullName = doctor.nombre + " " + doctor.apellido;
  }

  seleccionarPaciente(paciente: Persona){
    this.paciente = paciente
    this.paciente.fullName = paciente.nombre + " " + paciente.apellido;
  }

  buscar(): void{
    this.config.currentPage = 1;
    this.filtros.idPaciente = this.paciente.idPersona;
    this.filtros.idDoctor = this.doctor.idPersona;

    this.getReservas();
  }
}
