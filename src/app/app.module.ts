import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriaService } from "./service/categoria.service";
import { AppRoutingModule } from './app-routing.module';
import { PersonaComponent } from './paciente_doctor/paciente-doctor.component';
import { PersonaService } from "./service/paciente_doctor.service";
import { ReservaComponent } from './reservas/reservas.component';
import { ReservaService } from './service/reserva.service';
import { NuevaReservaComponent } from './reservas/nueva-reserva/nueva-reserva.component';
import { ModificarReservaComponent } from './reservas/modificar-reserva/modificar-reserva.component';
@NgModule({
  declarations: [
    AppComponent,
    CategoriasComponent,
    PersonaComponent,
    ReservaComponent,
    NuevaReservaComponent,
    ModificarReservaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule

  ],
  providers: [
    CategoriaService,
    PersonaService,
    ReservaService
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
