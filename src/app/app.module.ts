import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProveedoresComponent,dialogoEditaProveedor } from './proveedores/proveedores.component';
import { MatTableModule } from '@angular/material'  
import { MatPaginatorModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule ,MatCheckboxModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    ProveedoresComponent,
    dialogoEditaProveedor
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
  entryComponents: [dialogoEditaProveedor],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
