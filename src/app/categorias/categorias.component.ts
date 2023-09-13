import { Component, OnInit } from '@angular/core';
import { Categoria } from '../model/categoria.model';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  nuevaCategoria: string = '';
  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categorias = this.categoriaService.getCategorias();
  }

  agregarCategoria(): void {
    if (this.nuevaCategoria.trim() !== '') {
      this.categoriaService.agregarCategoria(this.nuevaCategoria);
      this.nuevaCategoria = '';

      // Después de agregar una categoría, vuelves a cargar la lista de categorías
      this.cargarCategorias();
    }
  }

  editarCategoria(id: number, nuevaDescripcion: string): void {
    this.categoriaService.editarCategoria(id, nuevaDescripcion);

    // Después de editar una categoría, vuelves a cargar la lista de categorías
    this.cargarCategorias();
  }

  eliminarCategoria(id: number): void {
    this.categoriaService.eliminarCategoria(id);
    // Después de eliminar una categoría, vuelves a cargar la lista de categorías
    this.cargarCategorias();
  }
}
