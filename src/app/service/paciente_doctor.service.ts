import { Injectable } from '@angular/core';
import { Persona } from '../model/paciente_doctor.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  private personas: Persona[] = [];
  private nextId: number = 1;

  // constructor() {}
  constructor(private angularFirestore: AngularFirestore) {}


  getPersonas(): Persona[] {
    return this.personas;
  }

  // agregarPersona(nuevaPersona: Persona): void {
  //   nuevaPersona.idPersona = this.nextId++;
  //   this.personas.push(nuevaPersona);
  // }
  agregarPersona(nuevaPersona: Persona) {
    // Convierte la instancia de Persona en un objeto plano
    const personaData = {
      nombre: nuevaPersona.nombre,
      apellido: nuevaPersona.apellido,
      telefono: nuevaPersona.telefono,
      email: nuevaPersona.email,
      cedula: nuevaPersona.cedula,
      flag_es_doctor: nuevaPersona.flag_es_doctor
    };
  
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection("persona-collection")
        .add(personaData) // Utiliza el objeto plano personaData
        .then(response => {
          console.log(response);
          resolve(response); // Resuelve la promesa con la respuesta
        })
        .catch(error => {
          console.error(error);
          reject(error); // Rechaza la promesa si hay un error
        });
    });
  }
  

  editarPersona(id: number, nuevaPersona: Persona): void {
    const personaIndex = this.personas.findIndex(p => p.idPersona === id);
    if (personaIndex !== -1) {
      this.personas[personaIndex] = nuevaPersona;
    }
  }

  eliminarPersona(id: number): void {
    this.personas = this.personas.filter(p => p.idPersona !== id);
  }
}
