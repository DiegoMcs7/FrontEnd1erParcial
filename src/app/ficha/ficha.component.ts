import { Component, OnInit } from '@angular/core';
import { Categoria } from '../model/categoria.model';
import { Ficha } from '../model/fichas';
import { Persona } from '../model/paciente_doctor.model';
import { CategoriaService } from "../service/categoria.service";
import { ServicefichaService } from '../service/serviceficha.service';

type Filtro = {
  fechaDesde ?: string,
  fechaHasta?: string,
  idDoctor?: number,
  idPaciente?: number,
  idCategoria?: number,
};
@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  public data: Ficha[] = [];
  public columns = ["Fecha","Doctor","Paciente","Categoria","Acciones"];
  config = {
      id: "paginationFicha",
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: 1
  }

  next = "Siguiente"
  back = "Atras"
  categorias: Categoria [] = []
  doctor : Persona = new Persona()
  paciente : Persona = new Persona()
  categoria: Categoria = new Categoria()
  filtros: Filtro = {};
  constructor(private servicioFicha: ServicefichaService,private serviceCategoria: CategoriaService) { }

  ngOnInit(){
    this.getCategorias()
  }
  getFichas(){
    let currentPage = this.config.currentPage;
    let itemsPerPage = this.config.itemsPerPage;
    let inicio = currentPage-1;
    inicio = inicio*itemsPerPage;
    this.servicioFicha.getfichas(this.filtros,itemsPerPage,inicio)
    .subscribe((data:any)=>{
     this.data = data.lista;
     this.config.totalItems=data.totalDatos;
    });
  }

  pageChanged(event: number){
    this.config.currentPage = event;
    this.getFichas()
  }

  buscar(): void{
    this.config.currentPage = 1
    this.filtros.idPaciente = this.paciente.idPersona
    this.filtros.idDoctor = this.doctor.idPersona

    this.getFichas()
  }
  seleccionarDoctor(doctor: Persona){
    this.doctor = doctor
    this.doctor.fullName = doctor.nombre + " " + doctor.apellido;
  }

  seleccionarPaciente(paciente: Persona){
    this.paciente = paciente
    this.paciente.fullName = paciente.nombre + " " + paciente.apellido;
  }
  getCategorias() {
    this.serviceCategoria.getCategorias().subscribe((data: any) => {
      this.categorias = data.lista;
    });
  }

}
