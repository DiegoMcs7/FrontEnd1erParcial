import { Injectable } from '@angular/core';
import { Ficha } from '../model/fichas';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Persona } from '../model/paciente_doctor.model';
import { Categoria } from '../model/categoria.model';
@Injectable({
  providedIn: 'root'
})
export class ServicefichaService {

  constructor(private angularFirestore: AngularFirestore,private http: HttpClient) { }

  getFichas(): Observable<Ficha[]> {
    return this.angularFirestore
      .collection("ficha-collection")
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as Ficha; // Ajusta el tipo según tus datos reales
            const id = action.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  agregarFicha(nuevaFicha: Ficha) {
    const fichaData = {
      idFichaClinica: nuevaFicha.idFichaClinica,
      idDoctor: JSON.parse(JSON.stringify(nuevaFicha.idDoctor)),
      idPaciente: JSON.parse(JSON.stringify(nuevaFicha.idPaciente)),
      idCategoria: JSON.parse(JSON.stringify(nuevaFicha.idCategoria)),
      diagnostico: nuevaFicha.diagnostico,
      observacion: nuevaFicha.observacion,
      motivoConsulta: nuevaFicha.motivoConsulta,
      fechaHora: nuevaFicha.fechaHora,

    };

    // Agregar la nueva ficha con el ID único a Firestore
    this.angularFirestore
      .collection("ficha-collection")
      .add(fichaData)
      .then(response => {
        console.log(`ficha con ID ${response.id} agregada con éxito.`);
      })
      .catch(error => {
        console.error('Error al agregar la ficha:', error);
      });

  }

  editarFicha(idFichaClinica: number, nuevaFicha: Ficha, Doctor: Persona, Paciente: Persona, Categoria: Categoria, Fecha:string) {
    return this.angularFirestore
      .collection("ficha-collection", ref => ref.where("idFichaClinica", "==", idFichaClinica))
      .get()
      .toPromise()
      .then(querySnapshot => {
        if (querySnapshot) {
          const doc = querySnapshot.docs[0];
          const ficha = doc.data() as Ficha;
          const updateData: any = {}; // Objeto para almacenar los campos a actualizar

          // Verificar si Doctor no es null antes de asignarlo
          if (Doctor) {
            updateData.idDoctor = JSON.parse(JSON.stringify(Doctor));
          }
          // Verificar si Paciente no es null antes de asignarlo
          if (Paciente) {
            updateData.idPaciente = JSON.parse(JSON.stringify(Paciente));
          }
          if (Categoria) {
            updateData.idCategoria = JSON.parse(JSON.stringify(Categoria));
          }
          // Verificar si Fecha no es null antes de asignarlo
          if (Fecha) {
            updateData.fechaHora = Fecha;
          }
          if (nuevaFicha.motivoConsulta) {
            updateData.motivoConsulta = nuevaFicha.motivoConsulta;
          }
          if (nuevaFicha.observacion) {
            updateData.observacion = nuevaFicha.observacion;
          }
          if (nuevaFicha.diagnostico) {
            updateData.diagnostico = nuevaFicha.diagnostico;
          }
          return doc.ref.update(updateData);
        }else {
          console.log("No se encontró ninguna reserva con idReserva igual a 3");
          return null; // Manejar el caso en el que no se encuentra ninguna reserva
        }
      }).catch(error => {
        console.error('Error al editar la ficha con idReserva 3:', error);
      });

  }



}
