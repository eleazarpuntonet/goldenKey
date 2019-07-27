import { Injectable } from '@angular/core';
import  tiendasFile from "./data/tiendas.json"
import { ProveedoresService } from './proveedores.service';
import { ProductosService } from './productos.service';
localStorage.setItem('tiendas', JSON.stringify(tiendasFile))

@Injectable({
  providedIn: 'root'
})
export class TiendasService {
	tiendas : any = [] 
  constructor(
  	private proveedoresService : ProveedoresService,
  	private productosService : ProductosService,
  	) {
		this.tiendas = JSON.parse(localStorage.getItem('tiendas'))
  }

  newTienda(newTienda){
    newTienda.id = this.tiendas.length+1
  	this.tiendas.push(newTienda)
  	this.saveTiendas()
  }

  saveTiendas(){
    console.log("Tiendas actualizado")
  	localStorage.setItem('tiendas', JSON.stringify(this.tiendas))
  }

  getTiendas(){
    let tiendas = JSON.parse(localStorage.getItem('tiendas'))
		return tiendas
  }

  edtTiendas(newTienda){
  	let indx = this.tiendas.findIndex((item,index)=>{
  		return item.id === newTienda.id
  	})
  	this.tiendas.splice(indx,1,newTienda)
  	this.saveTiendas()
  }

  delTienda(id){
  	let indx = this.tiendas.findIndex((item,index)=>{
  		return item.id === id
  	})
  	this.tiendas.splice(indx,1)
  	this.saveTiendas()
  }

  massDelTiendas(arr){
    arr.forEach((val,index)=>{
      let indx = this.tiendas.findIndex((item)=>{
        return item.id === val.id
      })
      this.tiendas.splice(indx,1)
    })
    this.saveTiendas()
  }

  findTienda(id){
    let x = this.tiendas.find((val)=>{
      return val.id === id
    })
    return x
  }


}
