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

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  public data: Ficha[] = [];
  public columns = ["Fecha","Doctor","Paciente","Categoria","Acciones"];

  categorias: Categoria [] = []
  categoria: Categoria = new Categoria()
  personas: Persona[] = [];
  fichas: Ficha [] = []

  constructor(private servicioFicha: ServicefichaService,private serviceCategoria: CategoriaService, private personaService: PersonaService) { }

  ngOnInit(){
    this.getCategorias()
    this.cargarPersonas();
    this.cargarFichas();
  }

  cargarFichas(): void {
    this.fichas = [];
    this.servicioFicha.getFichas().subscribe((fichas: Ficha[]) => {
      this.fichas = fichas;
    });
  }

  cargarPersonas(): void {
    this.personaService.getPersonas().subscribe((data: Persona[]) => {
      this.personas = data;
    });
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
