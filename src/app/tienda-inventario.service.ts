import { Injectable } from '@angular/core';
import  inventarioFile from "./data/inventario_tiendas.json"
import { ProveedoresService } from './proveedores.service';
import { ProductosService } from './productos.service';
import { TiendasService } from './tiendas.service';
localStorage.setItem('inventario_tiendas', JSON.stringify(inventarioFile))

@Injectable({
  providedIn: 'root'
})
export class TiendaInventarioService {
	inventario_tiendas : any = [] 

  constructor(
  	private proveedoresService : ProveedoresService,
  	private productosService : ProductosService,
  	private tiendasService : TiendasService,
  	) {
		this.inventario_tiendas = JSON.parse(localStorage.getItem('inventario_tiendas'))
  }

  edtValue(){
  	console.log("Editando value ando")
  }

  newInventarioValue(newInventarioValue){
    newInventarioValue.id = this.inventario_tiendas[this.inventario_tiendas.length-1].id+1
  	this.inventario_tiendas.push(newInventarioValue)
  	this.updInventario()
  }

  updInventario(){
  	localStorage.setItem('inventario_tiendas', JSON.stringify(this.inventario_tiendas))
  }

  getInventarioTiendas(){
		let inventario = JSON.parse(localStorage.getItem('inventario_tiendas'))
		inventario.forEach((val,index)=>{
		  val.producto = this.producto(val.id_producto)
		  val.tienda = this.tienda(val.id_tienda)
		})
		return inventario
  }

  edtInventario(newInventarioValue){
  	let indx = this.inventario_tiendas.findIndex((item,index)=>{
  		return item.id === newInventarioValue.id
  	})
  	this.inventario_tiendas.splice(indx,1,newInventarioValue)
  	this.updInventario()
  }

  delInventario(id){
  	let indx = this.inventario_tiendas.findIndex((item,index)=>{
  		return item.id === id
  	})
  	this.inventario_tiendas.splice(indx,1)
  	this.updInventario()
  }

  massDelInventario(arr){
    arr.forEach((val,index)=>{
      let indx = this.inventario_tiendas.findIndex((item)=>{
        return item.id === val.id
      })
      this.inventario_tiendas.splice(indx,1)
    })
    this.updInventario()
  }

  producto(id){
  	return this.productosService.findProducto(id)
  }

  tienda(id){
  	return this.tiendasService.findTienda(id)
  }
}
