import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../model/categoria.model';
import { Ficha } from '../../model/fichas';
import { Persona } from '../../model/paciente_doctor.model';
import { CategoriaService } from '../../service/categoria.service';
import { ServicefichaService } from '../../service/serviceficha.service';
import { PersonaService } from '../../service/paciente_doctor.service'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-nuevaficha',
  templateUrl: './nuevaficha.component.html',
  styleUrls: ['./nuevaficha.component.css']
})

export class NuevafichaComponent implements OnInit {
  ficha: Ficha = new Ficha();
  doctor: Persona = new Persona();
  paciente: Persona = new Persona();
  categorias: Categoria[] = []
  categoria: Categoria = new Categoria()
  personas: Persona[] = [];
  personaSeleccionada1: number | undefined;
  personaSeleccionada2: number | undefined;
  constructor(private categoriaService: CategoriaService, private serviceFicha: ServicefichaService, private personaService: PersonaService) { }

  ngOnInit(): void {
    this.getCategorias()
    this.cargarPersonas();
  }

  cargarPersonas(): void {
    this.personaService.getPersonas().subscribe((data: Persona[]) => {
      this.personas = data;
    });

  }
  seleccionarDoctor(doctor: Persona){
    this.doctor = doctor
    this.doctor.fullName = doctor.nombre + " " + doctor.apellido;
  }

  seleccionarPaciente(paciente: Persona){
    this.paciente = paciente
    this.paciente.fullName = paciente.nombre + " " + paciente.apellido;
  }
  getCategorias(){
    this.categoriaService.getCategorias().subscribe((data: Categoria[]) => {
      this.categorias = data;
    });
  }

  guardarFicha(){
    this.ficha.idPaciente = new Persona;
    this.ficha.idDoctor = new Persona;
    this.ficha.idPaciente.idPersona = this.paciente.idPersona
    this.ficha.idDoctor.idPersona = this.doctor.idPersona
    this.serviceFicha.postficha(this.ficha).subscribe()
  }

}
