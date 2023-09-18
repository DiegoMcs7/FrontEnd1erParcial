export class Persona {
  idPersona!: number;
  nombre!: string;
  apellido!: string;
  fullName!: string;
  telefono!: string;
  email!: string;
  cedula!: string;
  flag_es_doctor: boolean = true; // Establece el valor por defecto en true
  editFieldName: boolean= false;
}
