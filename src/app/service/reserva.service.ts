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
  doctor: Persona = new Persona();
  paciente: Persona = new Persona();
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
    this.getReservas().subscribe((reservas: Reserva[]) => {
      const maxId = reservas.length === 0 ? 0 : Math.max(...reservas.map(reserva => reserva.idReserva));
      nuevaReserva.idReserva = maxId + 1;
    });
      const reservaData = {
        idReserva: nuevaReserva.idReserva,
        idDoctor: nuevaReserva.idDoctor.idPersona,
        idPaciente: nuevaReserva.idPaciente.idPersona,
        fecha: nuevaReserva.fecha,
        horaInicio: nuevaReserva.horaInicio,
        horaFin: nuevaReserva.horaFin,
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

  cancelarReserva(idReserva: string) {
    // Supongamos que tienes una reserva con ID 'idDeLaReserva'
    const reservaRef = this.angularFirestore.collection('reserva-collection').doc('idReserva');

    // Actualiza el estado de la reserva a "cancelada"
    reservaRef.update({ flagEstado: 'cancelada' })
      .then(() => {
        console.log(`Reserva con ID ${idReserva} cancelada.`);
      })
      .catch(error => {
        console.error(`Error al cancelar la reserva con ID ${idReserva}:`, error);
      });
  }

  modificarReserva(reserva: ReservaPutBody): Observable<void> {
    return this.http.put<void>(`${this.api}stock-pwfe/reserva`, reserva);
  }

}
