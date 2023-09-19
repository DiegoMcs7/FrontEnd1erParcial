import { Component, OnInit } from '@angular/core';
import { Categoria } from '../model/categoria.model';
import { Ficha } from '../model/fichas';
import { Persona } from '../model/paciente_doctor.model';
import { CategoriaService } from "../service/categoria.service";
import { ServicefichaService } from '../service/serviceficha.service';
import { PersonaService } from '../service/paciente_doctor.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'

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
  personas: Persona[] = [];
  personaSeleccionada1: number | undefined;
  personaSeleccionada2: number | undefined;
  constructor(private servicioFicha: ServicefichaService,private serviceCategoria: CategoriaService, private personaService: PersonaService) { }

  ngOnInit(){
    this.getCategorias()
    this.cargarPersonas();
  }

  cargarPersonas(): void {
    this.personaService.getPersonas().subscribe((data: Persona[]) => {
      this.personas = data;
    });
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

  downloadPDF() {
    // Extraemos el
    const DATA: any = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }

}
