import { Component, OnInit } from '@angular/core';
import { Persona } from '../model/paciente_doctor.model';
import { PersonaService } from '../service/paciente_doctor.service'
import { Reserva } from '../model/reserva.model';
import { ReservaService } from '../service/reserva.service';
import { parse } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
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
  selector: 'app-reserva',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservaComponent implements OnInit {
  public columns = ["Fecha","Hora inicio","Hora fin","Doctor","Paciente", "Acciones"];
  public data: Reserva[] = [];
  reservas: Reserva[] = [];
  personas: Persona[] = [];

  fecha_inicio: Fecha = new Fecha();
  fecha_fin: Fecha = new Fecha();

  date_inicio: Date = new Date();
  date_fin: Date = new Date();
  personaSeleccionada1: Persona = new Persona();
  personaSeleccionada2: Persona = new Persona();
  doctor: Persona = new Persona();
  reservas_filtradas: Reserva[] = [];
  paciente: Persona = new Persona();
  constructor(private reservaService: ReservaService, private personaService: PersonaService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.cargarPersonas();
    this.cargarReservas();
  }

  onDateChange1() {
    this.date_inicio.setDate(this.fecha_inicio.day);
    this.date_inicio.setMonth(this.fecha_inicio.month-1);
    this.date_inicio.setFullYear(this.fecha_inicio.year);

  }

  onDateChange2() {
    this.date_fin.setDate(this.fecha_fin.day);
    this.date_fin.setMonth(this.fecha_fin.month-1);
    this.date_fin.setFullYear(this.fecha_fin.year);

  }
  cargarPersonas(): void {
    this.personaService.getPersonas().subscribe((data: Persona[]) => {
      this.personas = data;
    });
  }

  cargarReservas(): void {
    this.reservaService.getReservas().subscribe((reservas: Reserva[]) => {
      this.reservas = reservas;
      const now = new Date();
      this.reservas_filtradas = reservas.filter((reserva) => parse(reserva.fecha, 'yyyy/MM/dd', new Date()).getFullYear() === now.getFullYear() &&
      parse(reserva.fecha, 'yyyy/MM/dd', new Date()).getMonth() === now.getMonth() &&
      parse(reserva.fecha, 'yyyy/MM/dd', new Date()).getDate() === now.getDate())
    });
  }

  cancelarReserva(reserva: Reserva) {

    this.toastr.success('Se canceló una reserva');
    this.reservaService.cancelarReserva(reserva)

  }

  busquedaFiltrada(){
    this.reservas_filtradas = []
    if (this.personaSeleccionada1 && this.personaSeleccionada2) {

      this.reservas_filtradas = this.reservas.filter((reserva) => (reserva.idDoctor.idPersona === this.personaSeleccionada1.idPersona &&
        reserva.idPaciente.idPersona === this.personaSeleccionada2.idPersona &&
        parse(reserva.fecha, 'yyyy/MM/dd', new Date()).getDate() >= this.date_inicio.getDate() &&
        parse(reserva.fecha, 'yyyy/MM/dd', new Date()).getMonth() >= this.date_inicio.getMonth() &&
        parse(reserva.fecha, 'yyyy/MM/dd', new Date()).getFullYear() >= this.date_inicio.getFullYear() &&
        parse(reserva.fecha, 'yyyy/MM/dd', new Date()).getDate() <= this.date_fin.getDate() &&
        parse(reserva.fecha, 'yyyy/MM/dd', new Date()).getMonth() <= this.date_fin.getMonth() &&
        parse(reserva.fecha, 'yyyy/MM/dd', new Date()).getFullYear() <= this.date_fin.getFullYear()));
    }
  }

}
