import { Persona } from '../model/paciente_doctor.model';

export class Reserva {
    idReserva!: number;
    fecha!: string;
    horaInicio!: string;
    horaFin!: string;
    idDoctor!: Persona;
    idPaciente!: Persona;
    flagEstado!: string;
    flagAsistio!: string;
    observacion!: string;
}

export class ReservaPostBody {
    fechaCadena!: string;
    horaInicioCadena!: string;
    horaFinCadena!: string;
    idDoctor!: Partial<Persona>;
    idPaciente!: Partial<Persona>;
}

export class ReservaPutBody {
    idReserva!: number;
    flagAsistio!: string;
    observacion!: string;
}
