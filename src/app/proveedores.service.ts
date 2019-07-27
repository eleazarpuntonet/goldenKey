import { Injectable } from '@angular/core';
import  proveedoresFile from "./data/proveedores.json"
localStorage.setItem('proveedores', JSON.stringify(proveedoresFile))
@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
	proveedores : any = [] 
  
  constructor() {
    this.proveedores = JSON.parse(localStorage.getItem('proveedores'))
  }

  newProveedor(newProveedor){
  	this.proveedores.push(newProveedor)
  	this.saveProveedores()
  }

  getProveedores(){
  	return this.proveedores
  }

  edtProveedores(id,newProveedor){
  	let indx = this.proveedores.findIndex((item,index)=>{
  		return item.id === id
  	})
  	this.proveedores.splice(indx,1,newProveedor)
  	this.saveProveedores()
  }

  delProveedor(id){
    console.log("Proveedor: "+id+" eliminado")
  	let indx = this.proveedores.findIndex((item,index)=>{
  		return item.id === id
  	})
  	this.proveedores.splice(indx,1)
  	this.saveProveedores()
  }

  saveProveedores(){
    console.log("Storage actualizado")
  	localStorage.setItem('proveedores', JSON.stringify(this.proveedores))
  }
}
