import { NgModule,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatPaginator,
    MatTableDataSource
  ],
  exports: [
		MatPaginator,
		MatTableDataSource
	],
})


export class MaterialModule { }
