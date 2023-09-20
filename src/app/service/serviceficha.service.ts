import { Injectable } from '@angular/core';
import { listadatos } from '../model/datos';
import { Ficha } from '../model/fichas';
import { base_url } from '../base_url';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class ServicefichaService {
  private api = base_url + 'stock-pwfe/fichaClinica';

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

  getAllfichas():Observable<listadatos<Ficha>>{
    return this.http.get<listadatos<Ficha>>(this.api);
  }
  postficha(ficha: Ficha):Observable<Ficha>{
    console.log("headers: " + localStorage.getItem("userSession") ?? "" )
    return this.http.post<Ficha>(this.api,ficha,{
      headers:{usuario: localStorage.getItem("userSession") ?? ""}
    }).pipe(
      tap(
        data => console.log("Agregado: " + data),
        error => console.log("Error: " + error)
      )
    );
  }
  getFicha(idFichaClinica: number):Observable<Ficha>{
    return this.http.get<Ficha>(this.api + '/' + idFichaClinica);
  }
  putFicha(ficha: Ficha):Observable<Ficha>{
    return this.http.put<Ficha>(this.api,{'idFichaClinica': ficha.idFichaClinica, 'observacion': ficha.observacion});
  }


}
