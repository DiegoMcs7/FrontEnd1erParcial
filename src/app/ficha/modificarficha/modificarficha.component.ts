import { Component, OnInit } from '@angular/core';
import { ServicefichaService } from 'src/app/service/serviceficha.service';
import { Ficha } from 'src/app/model/fichas';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modificarficha',
  templateUrl: './modificarficha.component.html',
  styleUrls: ['./modificarficha.component.css']
})
export class ModificarfichaComponent implements OnInit {
  ficha: Ficha = new Ficha()
  constructor(private route: ActivatedRoute, private servicioFicha: ServicefichaService) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.ficha.idFichaClinica = parseInt(paramMap.get('id') ?? '');
      this.servicioFicha.getFicha(this.ficha.idFichaClinica)
      .subscribe((data:any)=>{
        this.ficha = data;
        this.ficha.idPaciente.fullName =this.ficha.idPaciente.nombre + ' ' + this.ficha.idPaciente.apellido;
        this.ficha.idDoctor.fullName =this.ficha.idDoctor.nombre + ' ' +   this.ficha.idDoctor.apellido;
      });
    });

  }

  guardar(): void{
    this.servicioFicha.putFicha(this.ficha).subscribe();
  }
}
