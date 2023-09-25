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
  selector: 'app-editarficha',
  templateUrl: './editarficha.component.html',
  styleUrls: ['./editarficha.component.css']
})
export class EditarfichaComponent {
  ficha: Ficha = new Ficha()
  nuevaFicha: Ficha = new Ficha();
  fichas: Ficha[] = [];
  ficha1: Ficha | undefined
  doctor: Persona = new Persona();
  paciente: Persona = new Persona();
  categorias: Categoria[] = []
  categoria: Categoria = new Categoria()
  personas: Persona[] = [];
  max_id: number = 0;
  fecha: Fecha = new Fecha();
  edit_id: number = 0;
  motivo: string = '';
  diagnostico: string = '';
  observacion: string = '';

  constructor( private categoriaService: CategoriaService
    , private serviceFicha: ServicefichaService,private toastr: ToastrService,
     private personaService: PersonaService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getCategorias();
    this.cargarPersonas();
    this.cargarFichas();
  }

  cargarFichas(): void {
    this.fichas = [];
    this.serviceFicha.getFichas().subscribe((fichas: Ficha[]) => {
      this.fichas = fichas;
      const routeParams = this.route.snapshot.paramMap;
      const reservaIdFromRoute = Number(routeParams.get('id'));
      console.log(reservaIdFromRoute);
      this.ficha1 = this.fichas.find((ficha2) => reservaIdFromRoute === ficha2.idFichaClinica);
      console.log(this.ficha1);
      if (this.ficha1) {
        this.ficha = this.ficha1;
      }
      const fecha = this.ficha.fechaHora.split("/");

      this.fecha.year = parseInt(fecha[0]);
      this.fecha.month = parseInt(fecha[1]);
      this.fecha.day = parseInt(fecha[2]);

      this.doctor= this.ficha.idDoctor;
      this.paciente= this.ficha.idPaciente;
      this.categoria=this.ficha.idCategoria;
      this.motivo=this.ficha.motivoConsulta;
      this.diagnostico=this.ficha.diagnostico;
      this.observacion=this.ficha.observacion;


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

  editarFicha(ficha: Ficha): void {
    this.edit_id = ficha.idFichaClinica;
    ficha.editFieldName=true;
  }

  guardarEdicionCambios(ficha: Ficha): void {
    this.personaService.getPersonas().subscribe((personas: Persona[]) => {
      const fecha = this.fecha;
      const fechaStr = `${fecha.year}/${fecha.month}/${fecha.day}`;
      const doctor_edit = personas.find(persona => persona.idPersona === ficha.idDoctor?.idPersona);
      const paciente_edit = personas.find(persona => persona.idPersona === ficha.idPaciente?.idPersona);
      const categoria_edit = this.categorias.find(categoria => categoria.idCategoria === ficha.idCategoria?.idCategoria);
      if (doctor_edit && paciente_edit && categoria_edit) {
        this.serviceFicha.editarFicha(ficha.idFichaClinica, ficha, doctor_edit, paciente_edit,categoria_edit, fechaStr);
        this.toastr.success('Se editó una ficha');
        ficha.editFieldName = true;
      } else {
        console.log('No se encontró un doctor o paciente válido.');
      }
    });
  }

}
