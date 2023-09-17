import { Component, OnInit } from '@angular/core';
import { Categoria } from '../model/categoria.model';
import { CategoriaService } from '../service/categoria.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  nuevaCategoria: string = '';
  categorias$!: Observable<Categoria[]>; // Utilizamos el tipo Observable aquí

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  getCategorias() {
    this.categorias$ = this.categoriaService.getCategorias();
  }

  agregarCategoria(): void {
    if (this.nuevaCategoria.trim() !== '') {
      this.categoriaService.agregarCategoria(this.nuevaCategoria);
      this.nuevaCategoria = '';
      this.cargarCategorias();
    }
  }

  editarCategoria(id: number, nuevaDescripcion: string): void {
    this.categoriaService.editarCategoria(id, nuevaDescripcion);
    this.cargarCategorias();
  }

  eliminarCategoria(id: number): void {
    this.categoriaService.eliminarCategoria(id);
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.getCategorias();
  }
}
