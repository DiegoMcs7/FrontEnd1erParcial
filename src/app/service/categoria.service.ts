import { Injectable } from '@angular/core';
import { Categoria } from '../model/categoria.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private categorias: Categoria[] = [];
  private nextId: number = 1;

  constructor() { }

  getCategorias(): Observable<Categoria[]> {
    return of(this.categorias); // Devolvemos un Observable de las categorías actuales
  }

  agregarCategoria(nuevaCategoria: string): void {
    const nuevaCategoriaObj = new Categoria();
    nuevaCategoriaObj.idCategoria = this.nextId++;
    nuevaCategoriaObj.descripcion = nuevaCategoria;
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
