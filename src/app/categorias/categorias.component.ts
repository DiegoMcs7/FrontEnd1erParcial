import { Subject } from 'rxjs';
import { Categoria } from '../model/categoria.model';
import { CategoriaService } from '../service/categoria.service';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  nuevaCategoria: Categoria = new Categoria();
  categorias: Categoria[] = [];
  categoriaEditada: Categoria = new Categoria();
  edit_id: number = 0; // Campo edit_id como variable local
  editMode = false; // Modo de edición
  max_id: number = 0;
  constructor(private categoriaService: CategoriaService,private toastr: ToastrService) {}
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | undefined;
  dtOptions:DataTables.Settings={}
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.dtOptions = {
        pagingType: 'full_numbers',
        language: {
          url:'//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
        },
        searching: true,
        columns: [
          { searchable: true },
          { searchable: false },
        ],
    }
    this.cargarCategorias();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next(this.dtOptions);
    });
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe((categorias: Categoria[]) => {
      this.categorias = categorias;
      this.max_id= this.categorias.length;
      this.rerender();
    });
  }

  agregarCategoria(): void {
    this.max_id= this.max_id + 1;
    this.nuevaCategoria.idCategoria = this.max_id;

    if (this.nuevaCategoria.descripcion ) {
      this.categoriaService.agregarCategoria(this.nuevaCategoria)
        console.log('Categoria agregada con éxito.');
        this.toastr.success('Se agregó una categoria');
        this.nuevaCategoria = new Categoria();
        this.cargarCategorias();
    } else {
      console.error('Error al crear categoria');
    }
  }

  editarCategoria(categoria: Categoria): void {
    console.log(this.edit_id);
    this.edit_id = categoria.idCategoria;
    categoria.editFieldName=true;
    this.editMode = true;
    this.rerender();
  }

  guardarEdicionCambios(categoria: Categoria): void {
    console.log(this.edit_id);
    this.categoriaService.editarCategoria(this.edit_id, categoria);
    categoria.editFieldName=true;
    this.editMode = true;
    this.rerender();
  }

  cancelarEdicion(): void {
    this.editMode = false;
    this.categoriaEditada = new Categoria();
  }

  eliminarCategoria(categoria: Categoria): void {
    this.categoriaService.eliminarCategoria(categoria.idCategoria);
    this.rerender();
  }

}
