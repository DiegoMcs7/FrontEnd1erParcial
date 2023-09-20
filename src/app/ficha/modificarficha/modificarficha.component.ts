import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../model/categoria.model';
import { Ficha } from '../../model/fichas';
import { Persona } from '../../model/paciente_doctor.model';
import { CategoriaService } from '../../service/categoria.service';
import { ServicefichaService } from '../../service/serviceficha.service';
import { Reserva } from 'src/app/model/reserva.model';
import { ReservaService } from '../../service/reserva.service';
import { PersonaService } from '../../service/paciente_doctor.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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
  selector: 'app-modificarficha',
  templateUrl: './modificarficha.component.html',
  styleUrls: ['./modificarficha.component.css']
})
export class ModificarfichaComponent implements OnInit {
  ficha: Ficha = new Ficha()
  nuevaFicha: Ficha = new Ficha();
  fichas: Ficha[] = [];
  reserva: Reserva = new Reserva();
  reservas: Reserva[] = [];
  reserva1: Reserva | undefined
  doctor: Persona = new Persona();
  paciente: Persona = new Persona();
  categorias: Categoria[] = []
  categoria: Categoria = new Categoria()
  personas: Persona[] = [];
  max_id: number = 0;
  fecha: Fecha = new Fecha();

  constructor(private reservaService: ReservaService, private categoriaService: CategoriaService
    , private serviceFicha: ServicefichaService,private toastr: ToastrService,
     private personaService: PersonaService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getCategorias();
    this.cargarPersonas();
    this.cargarFichas();
    this.cargarReservas();
  }

  cargarFichas(): void {
    this.fichas = [];
    this.serviceFicha.getFichas().subscribe((fichas: Ficha[]) => {
      this.fichas = fichas;
      this.max_id= this.fichas.length;
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

      this.fecha.year = parseInt(fecha[0]);
      this.fecha.month = parseInt(fecha[1]);
      this.fecha.day = parseInt(fecha[2]);

      this.doctor= this.reserva.idDoctor;
      this.paciente= this.reserva.idPaciente;

      console.log(this.doctor);

    });
  }

  cargarPersonas(): void {
    this.personaService.getPersonas().subscribe((data: Persona[]) => {
      this.personas = data;
    });

  }

  getCategorias(){
    this.categoriaService.getCategorias().subscribe((data: Categoria[]) => {
      this.categorias = data;
    });
  }

  getDateString() {
    return `${this.fecha.year}/${this.fecha.month <= 9 ? '0' : ''}${this.fecha.month}/${this.fecha.day <= 9 ? '0' : ''}${this.fecha.day}`;
  }

  onDateChange() {
    this.doctor.idPersona, this.getDateString();
  }

  agregarFicha(): void {
    // Incrementar el max_id
    this.max_id = this.max_id + 1;

    // Asignar valores a nuevaFicha
    this.nuevaFicha.idFichaClinica = this.max_id;
    this.nuevaFicha.idDoctor = this.doctor;
    this.nuevaFicha.idPaciente = this.paciente;
    this.nuevaFicha.idCategoria = this.categoria;
    this.nuevaFicha.fechaHora = this.getDateString();

    // Comprobar que motivoConsulta, observacion y diagnostico no sean nulos o indefinidos
    if (
      this.nuevaFicha.idDoctor &&
      this.nuevaFicha.idPaciente &&
      this.nuevaFicha.idCategoria &&
      this.nuevaFicha.motivoConsulta &&
      this.nuevaFicha.observacion &&
      this.nuevaFicha.diagnostico
    ) {
      // Llamar al servicio para agregar la ficha
      this.serviceFicha.agregarFicha(this.nuevaFicha)
        console.log('Ficha agregada con éxito.');
        this.toastr.success('Se agregó una ficha');
        this.nuevaFicha = new Ficha();
        this.cargarFichas();
    } else {
      console.error('Asegúrate de completar todos los campos obligatorios.');
    }
  }
}
