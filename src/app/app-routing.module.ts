// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { PersonaComponent } from './paciente_doctor/paciente-doctor.component';
import { ModificarReservaComponent } from './reservas/modificar-reserva/modificar-reserva.component';
import { NuevaReservaComponent } from './reservas/nueva-reserva/nueva-reserva.component';
import { ReservaComponent } from './reservas/reservas.component';

const routes: Routes = [
  {path: '', redirectTo : 'reservas', pathMatch : 'full'},
  { path: 'categorias', component: CategoriasComponent },
  { path: 'personas', component: PersonaComponent },
  { path: 'reservas', component: ReservaComponent },
  { path: "reservas/nuevo", component: NuevaReservaComponent},
  { path: "reservas/:id/editar", component: ModificarReservaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
