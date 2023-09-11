import { Injectable } from '@angular/core';
import { Categoria } from '../model/categoria.model';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private categorias: Categoria[] = [];
  private nextId: number = 1;

  constructor() { }

  getCategorias(): Categoria[] {
    return this.categorias;
  }

  agregarCategoria(nuevaCategoria: string): void {
    const nuevaCategoriaObj = new Categoria(this.nextId++, nuevaCategoria);
    this.categorias.push(nuevaCategoriaObj);
  }

  editarCategoria(id: number, nuevaDescripcion: string): void {
    const categoria = this.categorias.find((c) => c.idCategoria === id);
    if (categoria) {
      categoria.descripcion = nuevaDescripcion;
    }
  }

  eliminarCategoria(id: number): void {
    this.categorias = this.categorias.filter((c) => c.idCategoria !== id);
  }
}
