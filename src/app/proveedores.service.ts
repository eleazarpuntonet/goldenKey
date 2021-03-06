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
    newProveedor.id = this.proveedores.length+1
  	this.proveedores.push(newProveedor)
  	this.saveProveedores()
  }

  getProveedores(){
  	return JSON.parse(localStorage.getItem('proveedores'))
  }

  edtProveedores(newProveedor){
  	let indx = this.proveedores.findIndex((item,index)=>{
  		return item.id === newProveedor.id
  	})
  	this.proveedores.splice(indx,1,newProveedor)
  	this.saveProveedores()
  }

  delProveedor(id){
  	let indx = this.proveedores.findIndex((item,index)=>{
  		return item.id === id
  	})
  	this.proveedores.splice(indx,1)
  	this.saveProveedores()
  }

  massDelProveedor(arr){
    arr.forEach((val,index)=>{
      let indx = this.proveedores.findIndex((item)=>{
        return item.id === val.id
      })
      this.proveedores.splice(indx,1)
    })
    this.saveProveedores()
  }

  saveProveedores(){
    console.log("Storage actualizado")
  	localStorage.setItem('proveedores', JSON.stringify(this.proveedores))
  }

  findProveedor(id){
    let x = this.proveedores.find((val)=>{
      return val.id === id
    })
    return x
  }
}
