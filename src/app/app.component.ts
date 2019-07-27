import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from './proveedores.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit {
	proveedores = {}
  tablaSelected = 'proveedores'
  title = 'proyectoGoldenKey'
  options: menuItem[] = [
    {value: 'proveedores', texto: 'Proveedores'},
    {value: 'productos', texto: 'Productos'},
    {value: 'tiendas', texto: 'Tiendas'},
    {value: 'inventario', texto: 'Inventario'},
  ];

	constructor(private proveedoresService : ProveedoresService){
  	this.proveedores = proveedoresService.getProveedores()
	}

  ngOnInit() {
    console.log("Tengo vida!")
  }

  changeTableSelection(){
    console.log("el valor de la tabla ha cambiado")
    console.log(this.tablaSelected)
  }
}

export interface menuItem {
  value: string;
  texto: string;
}
