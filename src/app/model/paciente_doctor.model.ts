export class Persona {
  idPersona: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  cedula: string;
  flag_es_doctor: boolean;

  constructor(
    idPersona: number,
    nombre: string,
    apellido: string,
    telefono: string,
    email: string,
    cedula: string,
    flag_es_doctor: boolean
  ) {
    this.idPersona = idPersona;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.email = email;
    this.cedula = cedula;
    this.flag_es_doctor = flag_es_doctor;
  }
}
