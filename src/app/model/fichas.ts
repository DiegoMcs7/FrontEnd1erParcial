import { Persona } from '../model/paciente_doctor.model';

export class Ficha{
    idFichaClinica!: number;
    fechaHora!: string;
    motivoConsulta!: string;
    observacion!: string;
    diagnostico!:string;
    idDoctor!: Persona;
    idPaciente!: Persona;

}
