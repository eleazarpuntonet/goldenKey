import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { 
  ProveedoresComponent,
  dialogoEditaProveedor,
  dialogoCreaProveedor } from './proveedores/proveedores.component';
import { FormsModule } from '@angular/forms';
import { 
  MatFormFieldModule, 
  MatInputModule ,
  MatCheckboxModule,
  MatPaginatorModule,
  MatTableModule,
  MatButtonModule,
  MatSelectModule,
  MatDialogModule,
  } from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { 
  ProductosComponent,
  dialogoEditaProducto,
  dialogoCreaProducto
} from './productos/productos.component';
import { 
  TiendasComponent,
  dialogoEditaTiendas,
  dialogoCrearTienda 
} from './tiendas/tiendas.component';
import { 
  TiendasInventarioComponent, 
  dialogoEditaInventarioTiendas,
  dialogoCreaInventarioTiendas } from './tiendas-inventario/tiendas-inventario.component';
@NgModule({
  declarations: [
    AppComponent,
    ProveedoresComponent,
    dialogoEditaProveedor,
    dialogoCreaProveedor,
    ProductosComponent,
    dialogoEditaProducto,
    dialogoCreaProducto,
    TiendasComponent,
    dialogoEditaTiendas,
    dialogoCrearTienda,
    TiendasInventarioComponent,
    dialogoEditaInventarioTiendas,
    dialogoCreaInventarioTiendas
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  entryComponents: [
    dialogoEditaProveedor,
    dialogoCreaProveedor,
    dialogoEditaProducto,
    dialogoCreaProducto,
    dialogoEditaTiendas,
    dialogoCrearTienda,
    dialogoCreaInventarioTiendas,
    dialogoEditaInventarioTiendas
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
