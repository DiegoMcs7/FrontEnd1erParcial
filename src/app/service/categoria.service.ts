import { Injectable } from '@angular/core';
import { Categoria } from '../model/categoria.model';

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
    // Crear una nueva instancia de Categoria
    const nuevaCategoriaObj = new Categoria();
    nuevaCategoriaObj.idCategoria = this.nextId++;
    nuevaCategoriaObj.descripcion = nuevaCategoria;

    // Agregar la nueva categoría al arreglo de categorías
    this.categorias.push(nuevaCategoriaObj);
  }

  editarCategoria(id: number, nuevaDescripcion: string): void {
    // Encontrar la categoría por su ID
    const categoria = this.categorias.find((c) => c.idCategoria === id);

    // Si la categoría existe, actualizar su descripción
    if (categoria) {
      categoria.descripcion = nuevaDescripcion;
    }
  }

  eliminarCategoria(id: number): void {
    // Filtrar las categorías para eliminar la que tiene el ID proporcionado
    this.categorias = this.categorias.filter((c) => c.idCategoria !== id);
  }
}
