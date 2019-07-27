import { Injectable } from '@angular/core';
import  proveedoresFile from "./data/productos.json"
import { ProveedoresService } from './proveedores.service';
localStorage.setItem('productos', JSON.stringify(proveedoresFile))
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
	productos : any = [] 
  constructor(private proveedoresService : ProveedoresService) {
		this.productos = JSON.parse(localStorage.getItem('productos'))
  }

  newProducto(newProducto){
    newProducto.id = this.productos.length+1
  	this.productos.push(newProducto)
  	this.saveProductos()
  }

  getProductos(){
    let productos = JSON.parse(localStorage.getItem('productos'))
    productos.forEach((val,index)=>{
      val.proveedor = this.proveedor(val.id_proveedor)
    })
		return productos
  }

  edtProductos(newProducto){
  	let indx = this.productos.findIndex((item,index)=>{
  		return item.id === newProducto.id
  	})
  	this.productos.splice(indx,1,newProducto)
  	this.saveProductos()
  }

  delProducto(id){
  	let indx = this.productos.findIndex((item,index)=>{
  		return item.id === id
  	})
  	this.productos.splice(indx,1)
  	this.saveProductos()
  }

  massDelProducto(arr){
    arr.forEach((val,index)=>{
      let indx = this.productos.findIndex((item)=>{
        return item.id === val.id
      })
      this.productos.splice(indx,1)
    })
    this.saveProductos()
  }

  saveProductos(){
    console.log("Productos actualizado")
  	localStorage.setItem('productos', JSON.stringify(this.productos))
  }

  proveedor(id){
    return this.proveedoresService.findProveedor(id)
  }

  findProducto(id){
    let x = this.productos.find((val)=>{
      return val.id === id
    })
    return x
  }

}
