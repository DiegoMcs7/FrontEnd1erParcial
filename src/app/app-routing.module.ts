// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { PersonaComponent } from './paciente_doctor/paciente-doctor.component';
import { ModificarReservaComponent } from './reservas/modificar-reserva/modificar-reserva.component';
import { NuevaReservaComponent } from './reservas/nueva-reserva/nueva-reserva.component';
import { ReservaComponent } from './reservas/reservas.component';
import { FichaComponent } from './ficha/ficha.component';
import { ModificarfichaComponent } from './ficha/modificarficha/modificarficha.component';
import { NuevafichaComponent } from './ficha/nuevaficha/nuevaficha.component';

const routes: Routes = [
  {path: '', redirectTo : 'reservas', pathMatch : 'full'},
  { path: 'categorias', component: CategoriasComponent },
  { path: 'personas', component: PersonaComponent },
  { path: 'reservas', component: ReservaComponent },
  { path: "reservas/nuevo", component: NuevaReservaComponent },
  { path: "reservas/:id/editar", component: ModificarReservaComponent },
  { path: "ficha/:id/editar", component: ModificarfichaComponent },
  { path: "ficha/nuevo",  component: NuevafichaComponent },
  { path: "ficha", component: FichaComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
