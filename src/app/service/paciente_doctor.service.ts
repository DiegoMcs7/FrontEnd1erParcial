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

  editarPersona(id: string, nuevaPersona: Persona) {
    console.log(id);
  return this.angularFirestore
    .collection("persona-collection")
    .doc(id)
    .update({
      nombre: nuevaPersona.nombre,
      apellido: nuevaPersona.apellido,
      telefono: nuevaPersona.telefono,
      email: nuevaPersona.email,
      cedula: nuevaPersona.cedula
    });
  }

  eliminarPersona(id: string) {
    console.log(id);
    const idComoString = id.toString();
    return this.angularFirestore
    .collection("persona-collection")
    .doc(idComoString)
    .delete();
  }
}
