import { Injectable } from '@angular/core';
import { Reserva, ReservaPostBody, ReservaPutBody } from '../model/reserva.model';
import { base_url } from '../base_url';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Persona } from '../model/paciente_doctor.model';
@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  api = base_url;

  constructor(private angularFirestore: AngularFirestore,private http: HttpClient) { }

  getReservas(): Observable<Reserva[]> {
    return this.angularFirestore
      .collection("reserva-collection")
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as Reserva; // Ajusta el tipo según tus datos reales
            const id = action.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  agregarReserva(nuevaReserva: Reserva) {
      const reservaData = {
        idReserva: nuevaReserva.idReserva,
        idDoctor: JSON.parse(JSON.stringify(nuevaReserva.idDoctor)),
        idPaciente: JSON.parse(JSON.stringify(nuevaReserva.idPaciente)),
        fecha: nuevaReserva.fecha,
        horaInicio: nuevaReserva.horaInicio,
        horaFin: nuevaReserva.horaFin,
        flagEstado: nuevaReserva.flagEstado,
      };


      // Agregar la nueva reserva con el ID único a Firestore
      this.angularFirestore
        .collection("reserva-collection")
        .add(reservaData)
        .then(response => {
          console.log(`Reserva con ID ${response.id} agregada con éxito.`);
        })
        .catch(error => {
          console.error('Error al agregar la reserva:', error);
        });

  }

  cancelarReserva(nuevaReserva: Reserva) {
    const idReserva = nuevaReserva.idReserva; // Obtén el ID de la reserva de nuevaReserva
    if (!idReserva) {
      console.error('El objeto nuevaReserva no tiene un ID válido.');
      return;
    }

    const reservaRef = this.angularFirestore.collection('reserva-collection', ref => ref.where("idReserva", "==", idReserva));

    // Obtener la reserva y actualizar su estado a "cancelada"
    reservaRef.get().toPromise()
      .then(querySnapshot => {
        if (querySnapshot) {
          const reservaDoc = querySnapshot.docs[0];
          if (reservaDoc) {
            return reservaDoc.ref.update({ flagEstado: 'Cancelada' });
          } else {
            console.error(`No se encontró ninguna reserva con el ID ${idReserva}.`);
            throw new Error(`No se encontró ninguna reserva con el ID ${idReserva}.`);
          }
        } else {
          console.error(`No se encontró ninguna reserva con el ID ${idReserva}.`);
          throw new Error(`No se encontró ninguna reserva con el ID ${idReserva}.`);
        }
      })
      .then(() => {
        console.log(`Reserva con ID ${idReserva} cancelada.`);
      })
      .catch(error => {
        console.error(`Error al cancelar la reserva con ID ${idReserva}:`, error);
      });
  }

  editarReserva(idReserva: number, nuevaReserva: Reserva) {
    return this.angularFirestore
      .collection("reserva-collection", ref => ref.where("idReserva", "==", idReserva))
      .get()
      .toPromise()
      .then(querySnapshot => {
        if (querySnapshot) {
          const reservaDoc = querySnapshot.docs[0];
          if (reservaDoc) {
            return reservaDoc.ref.update({
              idDoctor: JSON.parse(JSON.stringify(nuevaReserva.idDoctor)),
              idPaciente: JSON.parse(JSON.stringify(nuevaReserva.idPaciente)),
              fecha: nuevaReserva.fecha,
              horaInicio: nuevaReserva.horaInicio,
              horaFin: nuevaReserva.horaFin,
              observacion: nuevaReserva.observacion
            });
          } else {
            throw new Error("El documento de reserva no está definido");
          }
        } else {
          throw new Error(`No se encontró ninguna reserva con el nombre `);
        }
      })
      .catch(error => {
        console.error('Error al editar reserva por nombre:', error);
      });
  }

  modificarReserva(reserva: ReservaPutBody): Observable<void> {
    return this.http.put<void>(`${this.api}stock-pwfe/reserva`, reserva);
  }

}
