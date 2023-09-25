import { Component, OnInit } from '@angular/core';
import { Categoria } from '../model/categoria.model';
import { Ficha } from '../model/fichas';
import { Persona } from '../model/paciente_doctor.model';
import { CategoriaService } from "../service/categoria.service";
import { ServicefichaService } from '../service/serviceficha.service';
import { PersonaService } from '../service/paciente_doctor.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx'
import { parse } from 'date-fns';

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
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  public data: Ficha[] = [];
  public columns = ["Fecha","Doctor","Paciente","Categoria","Motivo de Consulta","Diagnostico","Observacion","Acciones"];

  categorias: Categoria [] = []
  categoria: Categoria = new Categoria()
  personas: Persona[] = [];
  fichas: Ficha [] = []
  date_inicio: Date = new Date();
  date_fin: Date = new Date();
  personaSeleccionada1: Persona = new Persona();
  personaSeleccionada2: Persona = new Persona();
  fecha_inicio: Fecha = new Fecha();
  fecha_fin: Fecha = new Fecha();
  fichas_filtradas: Ficha[] = [];
  constructor(private servicioFicha: ServicefichaService,private serviceCategoria: CategoriaService, private personaService: PersonaService) { }

  ngOnInit(){
    this.getCategorias()
    this.cargarPersonas();
    this.cargarFichas();
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
  cargarFichas(): void {
    this.fichas = [];
    this.servicioFicha.getFichas().subscribe((fichas: Ficha[]) => {
      this.fichas = fichas;
      this.fichas_filtradas = fichas;
    });
  }

  cargarPersonas(): void {
    this.personaService.getPersonas().subscribe((data: Persona[]) => {
      this.personas = data;
    });
  }

  getCategorias() {
    this.serviceCategoria.getCategorias().subscribe((data: Categoria[]) => {
      this.categorias = data;
    });
  }

  busquedaFiltrada(){
    this.fichas_filtradas = []
    if (this.personaSeleccionada1 && this.personaSeleccionada2) {

      this.fichas_filtradas = this.fichas.filter((ficha) => (ficha.idDoctor.idPersona === this.personaSeleccionada1.idPersona &&
        ficha.idPaciente.idPersona === this.personaSeleccionada2.idPersona && ficha.idCategoria.idCategoria === this.categoria.idCategoria &&
        parse(ficha.fechaHora, 'yyyy/MM/dd', new Date()).getDate() >= this.date_inicio.getDate() &&
        parse(ficha.fechaHora, 'yyyy/MM/dd', new Date()).getMonth() >= this.date_inicio.getMonth() &&
        parse(ficha.fechaHora, 'yyyy/MM/dd', new Date()).getFullYear() >= this.date_inicio.getFullYear() &&
        parse(ficha.fechaHora, 'yyyy/MM/dd', new Date()).getDate() <= this.date_fin.getDate() &&
        parse(ficha.fechaHora, 'yyyy/MM/dd', new Date()).getMonth() <= this.date_fin.getMonth() &&
        parse(ficha.fechaHora, 'yyyy/MM/dd', new Date()).getFullYear() <= this.date_fin.getFullYear()

        ));
    }

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
      docResult.save(`${new Date().toISOString()}_ficha.pdf`);
    });
  }

  name = 'ficha.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('htmlData');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

}
