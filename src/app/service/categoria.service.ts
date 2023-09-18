import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categoria } from '../model/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  constructor(private angularFirestore: AngularFirestore) {}

  getCategorias(): Observable<Categoria[]> {
    return this.angularFirestore
      .collection<Categoria>('categoria-collection')
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as Categoria;
            const id = action.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  agregarCategoria(nuevaCategoria: Categoria) {
    const categoriaData = {
      descripcion: nuevaCategoria.descripcion
    };
    return this.angularFirestore
    .collection('categoria-collection')
    .add(categoriaData);
  }

  editarCategoria(id: string, nuevaDescripcion: string){
    return this.angularFirestore
      .collection('categoria-collection')
      .doc(id)
      .update({ descripcion: nuevaDescripcion });
  }

  eliminarCategoria(id: string){
    return this.angularFirestore
      .collection('categoria-collection')
      .doc(id)
      .delete();
  }

}
