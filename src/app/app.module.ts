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
import { DataTablesModule } from 'angular-datatables';
import { NavbarComponent } from './navbar/navbar.component';
import { FichaComponent } from './ficha/ficha.component';
import { ServicefichaService } from './service/serviceficha.service';
import { NuevafichaComponent } from './ficha/nuevaficha/nuevaficha.component';
import { ModificarfichaComponent } from './ficha/modificarficha/modificarficha.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { environment } from 'src/environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditarfichaComponent } from './ficha/editarficha/editarficha.component';
@NgModule({
  declarations: [
    AppComponent,
    CategoriasComponent,
    PersonaComponent,
    ReservaComponent,
    NuevaReservaComponent,
    ModificarReservaComponent,
    NavbarComponent,
    FichaComponent,
    NuevafichaComponent,
    ModificarfichaComponent,
    EditarfichaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule,
    DataTablesModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    CategoriaService,
    PersonaService,
    ReservaService,
    ServicefichaService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {}
