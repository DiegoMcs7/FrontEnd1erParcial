import { Component, OnInit } from '@angular/core';
import { Categoria } from '../model/categoria.model';
import { CategoriaService } from '../service/categoria.service';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  nuevaCategoria: Categoria = new Categoria();
  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categorias = [];
    this.categoriaService.getCategorias().subscribe((categorias: Categoria[]) => {
      this.categorias = categorias;
    });
  }

  agregarCategoria(): void {
    if (
      this.nuevaCategoria.descripcion
    ) {
      this.categoriaService.agregarCategoria(this.nuevaCategoria);
      this.nuevaCategoria = new Categoria(); // Limpia el input
      this.cargarCategorias(); // Recarga la lista de categorías
    }
  }

  editarCategoria(id: number, nuevaDescripcion: string): void {
    const idComoString = id.toString();
    this.categoriaService.editarCategoria(idComoString, nuevaDescripcion);
    this.cargarCategorias();
  }

  eliminarCategoria(id: number): void {
    const idComoString = id.toString();
    this.categoriaService.eliminarCategoria(idComoString);
    this.cargarCategorias();
  }

}
