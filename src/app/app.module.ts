import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoriaService } from "./service/categoria.service";
import { AppComponent } from './app.component';
import { CategoriasComponent } from './categorias/categorias.component';

@NgModule({
  declarations: [AppComponent, CategoriasComponent],
  imports: [BrowserModule, FormsModule, RouterModule],
  providers: [CategoriaService],
  bootstrap: [AppComponent],
})
export class AppModule {}
