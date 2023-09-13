import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoriaService } from "./service/categoria.service";
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CategoriasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    CategoriaService
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
