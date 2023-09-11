// src/app/categorias/categorias.component.ts

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
    this.categorias = this.categoriaService.getCategorias();
  }

  agregarCategoria(): void {
    if (this.nuevaCategoria.trim() !== '') {
      this.categoriaService.agregarCategoria(this.nuevaCategoria);
      this.nuevaCategoria = '';
    }
  }

  editarCategoria(id: number, nuevaDescripcion: string): void {
    this.categoriaService.editarCategoria(id, nuevaDescripcion);
  }

  eliminarCategoria(id: number): void {
    this.categoriaService.eliminarCategoria(id);
  }
}

