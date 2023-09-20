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
      idCategoria: nuevaCategoria.idCategoria,
      descripcion: nuevaCategoria.descripcion
    };
    this.angularFirestore
    .collection('categoria-collection')
    .add(categoriaData)
    .then(response => {
      console.log(`Categoria con ID ${response.id} agregada con éxito.`);
    })
    .catch(error => {
      console.error('Error al agregar la categoria:', error);
    });
  }

  editarCategoria(idCategoria: number, nuevaCategoria: Categoria) {
    return this.angularFirestore
      .collection("categoria-collection", ref => ref.where("idCategoria", "==", idCategoria))
      .get()
      .toPromise()
      .then(querySnapshot => {
        if (querySnapshot) {
          // Si se encontró una categoria con ese nombre, actualiza su información
          const categoriaDoc = querySnapshot.docs[0];
          if (categoriaDoc) {
            return categoriaDoc.ref.update({
              descripcion: nuevaCategoria.descripcion,
            });
          } else {
            throw new Error("El documento de categoria no está definido");
          }
        } else {
          // Manejar el caso en el que no se encontró ninguna categoria con ese nombre
          throw new Error(`No se encontró ninguna categoria con el nombre `);
        }
      })
      .catch(error => {
        console.error('Error al editar categoria por nombre:', error);
        // Manejar el error de edición aquí
      });
  }

  async eliminarCategoria(idCategoria: number): Promise<void> {
    try {
      console.log("elimina");
      // Realiza la búsqueda del documento con el idCategoria
      const querySnapshot = await this.angularFirestore
        .collection("categoria-collection", ref => ref.where("idCategoria", "==", idCategoria))
        .get()
        .toPromise();
        // Verifica si se encontró alguna coincidencia
      if (querySnapshot) {
        // Itera sobre los documentos encontrados (en este caso, debería ser solo uno)
        querySnapshot.forEach(doc => {
          // Elimina el documento
          doc.ref.delete();
        });
      } else {
        // Manejar el caso en el que no se encontró ninguna persona con ese idCategoria
        throw new Error(`No se encontró ninguna persona con el id ${idCategoria}`);
      }
    } catch (error) {
      console.error('Error al eliminar persona por idCategoria:', error);
      // Manejar el error de eliminación aquí
    }
  }

}
