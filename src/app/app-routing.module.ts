// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { PersonaComponent } from './paciente_doctor/paciente-doctor.component';

const routes: Routes = [
  { path: 'categorias', component: CategoriasComponent },
  { path: 'personas', component: PersonaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
