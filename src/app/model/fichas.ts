import { Persona } from '../model/paciente_doctor.model';
import { Categoria } from '../model/categoria.model';
export class Ficha{
    idFichaClinica!: number;
    fechaHora!: string;
    motivoConsulta!: string;
    observacion!: string;
    diagnostico!:string;
    idDoctor!: Persona;
    idPaciente!: Persona;
    idCategoria!: Categoria;

}
