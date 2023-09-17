import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/categoria.model';
import { Ficha } from 'src/app/model/fichas';
import { Persona } from 'src/app/model/paciente_doctor.model';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ServicefichaService } from '../../service/serviceficha.service';

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
  constructor(private serviceCategoria: CategoriaService, private serviceFicha: ServicefichaService) { }

  ngOnInit(): void {
    this.getCategorias()
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
    this.serviceCategoria.getCategorias().subscribe((data:any)=>{
      this.categorias = data.lista;
    })
  }

  guardarFicha(){
    this.ficha.idPaciente = new Persona;
    this.ficha.idDoctor = new Persona;
    this.ficha.idPaciente.idPersona = this.paciente.idPersona
    this.ficha.idDoctor.idPersona = this.doctor.idPersona
    this.serviceFicha.postficha(this.ficha).subscribe()
  }

}
