import { Injectable } from '@angular/core';
import { Persona } from '../model/paciente_doctor.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  private personas: Persona[] = [];

  // constructor() {}
  constructor(private angularFirestore: AngularFirestore) {}


  getPersonas(): Observable<Persona[]> {
    return this.angularFirestore
      .collection("persona-collection")
      .snapshotChanges()
      .pipe(
        map(actions => {
          // Mapear las DocumentChangeAction a objetos Persona
          return actions.map(action => {
            const data = action.payload.doc.data() as Persona; // Ajusta el tipo según tus datos reales
            const id = action.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  agregarPersona(nuevaPersona: Persona) {
    // Obtener las personas actuales
    this.getPersonas().subscribe(personas => {
      // Encontrar el ID más alto entre las personas existentes o establecerlo en 0 si no hay registros
      const maxId = personas.length === 0 ? 0 : Math.max(...personas.map(persona => persona.idPersona));

      // Asignar el próximo ID basado en el máximo encontrado
      nuevaPersona.idPersona = maxId + 1;
    });
      // Convierte la instancia de Persona en un objeto plano
      const personaData = {
        idPersona: nuevaPersona.idPersona,
        nombre: nuevaPersona.nombre,
        apellido: nuevaPersona.apellido,
        telefono: nuevaPersona.telefono,
        email: nuevaPersona.email,
        cedula: nuevaPersona.cedula,
        flag_es_doctor: nuevaPersona.flag_es_doctor
      };

      // Agregar la nueva persona con el ID único
      this.angularFirestore
        .collection("persona-collection")
        .add(personaData)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
  }

  editarPersona(idPersona: number, nuevaPersona: Persona) {
    return this.angularFirestore
      .collection("persona-collection", ref => ref.where("idPersona", "==", idPersona))
      .get()
      .toPromise()
      .then(querySnapshot => {
        if (querySnapshot) {
          // Si se encontró una persona con ese id, actualiza su información
          const personaDoc = querySnapshot.docs[0];
          if (personaDoc) {
            return personaDoc.ref.update({
              nombre: nuevaPersona.nombre,
              apellido: nuevaPersona.apellido,
              telefono: nuevaPersona.telefono,
              email: nuevaPersona.email,
              cedula: nuevaPersona.cedula
            });
          } else {
            throw new Error("El documento de persona no está definido");
          }
        } else {
          // Manejar el caso en el que no se encontró ninguna persona con ese nombre
          throw new Error(`No se encontró ninguna persona con el nombre `);
        }
      })
      .catch(error => {
        console.error('Error al editar persona por nombre:', error);
        // Manejar el error de edición aquí
      });
  }

  async eliminarPersona(idPersona: number): Promise<void> {
    try {
      console.log("elimina");
      // Realiza la búsqueda del documento con el idPersona
      const querySnapshot = await this.angularFirestore
        .collection("persona-collection", ref => ref.where("idPersona", "==", idPersona))
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
        // Manejar el caso en el que no se encontró ninguna persona con ese idPersona
        throw new Error(`No se encontró ninguna persona con el id ${idPersona}`);
      }
    } catch (error) {
      console.error('Error al eliminar persona por idPersona:', error);
      // Manejar el error de eliminación aquí
    }
  }

}
