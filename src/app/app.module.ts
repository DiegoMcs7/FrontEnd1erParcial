import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriaService } from "./service/categoria.service";
import { AppRoutingModule } from './app-routing.module';
import { PersonaComponent } from './paciente_doctor/paciente-doctor.component';
import { PersonaService } from "./service/paciente_doctor.service";

@NgModule({
  declarations: [
    AppComponent,
    CategoriasComponent,
    PersonaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    CategoriaService,
    PersonaService
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
