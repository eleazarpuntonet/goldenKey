import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ProductosService } from '../productos.service';
import { ProveedoresService } from '../proveedores.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
	displayedColumns: string[] = ['select','id', 'id_proveedor', 'nombre', 'descripcion','action'];
	dataSource : any           = []
	selection = new SelectionModel<ProductosElements>(true, []);
	constructor(
		private productosService : ProductosService,
		public dialog: MatDialog){
		this.dataSource = new MatTableDataSource<ProductosElements>(productosService.getProductos());
	}
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator

	ngOnInit() {
	  this.dataSource.paginator = this.paginator
	}

	openEdtDialog(row){
		console.log(row)
		const dialogRef = this.dialog.open(dialogoEditaProducto, {
		  width: '350px',
		  data: {
		  	id           : row.id,
		  	id_proveedor : row.id_proveedor,
		  	nombre       : row.nombre,
		  	descripcion  : row.descripcion,
		  }
		})

		dialogRef.afterClosed().subscribe(result => {
			this.selection.clear()
			this.reloadData()
		})
	}

	delProducto(row){
		this.productosService.delProducto(row.id)
		this.reloadData()
	}

	massDelProducto(selecciones){
		this.productosService.massDelProducto(selecciones)
		this.selection.clear()
		this.reloadData()
	}

	crearProducto(){
		console.log("creando ando")
		const dialogRef = this.dialog.open(dialogoCreaProducto, {
		  width: '350px',
		  data: {}
		})

		dialogRef.afterClosed().subscribe(result => {
			this.selection.clear()
			this.reloadData()
		})
	}

	reloadData(){
		this.dataSource = new MatTableDataSource<ProductosElements>(this.productosService.getProductos());
		this.dataSource.paginator = this.paginator
	}

	isAllSelected() {
	  const numSelected  = this.selection.selected.length;
	  const numRows      = this.dataSource.data.length;
	  return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
	  this.isAllSelected() ?
	      this.selection.clear() :
	      this.dataSource.data.forEach(row => this.selection.select(row));
	}

	/** The label for the checkbox on the passed row */
	checkboxLabel(row?: ProductosElements): string {
	  if (!row) {
	    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
	  }
	  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
	}
}
export interface ProductosElements {
  id           : number;
  id_proveedor : number;
  nombre       : string;
  descripcion  : string;
}


export interface DialogData {
  producto: Object
}
@Component({
  selector    : 'dialogo-editar-producto',
  templateUrl : 'dialogoEditarProducto.html',
  styleUrls   : ['./dialogoEditarProducto.scss']

})
export class dialogoEditaProducto {
	proveedoresList : any           = []
  constructor(
  	private productosService             : ProductosService,
  	private proveedoresService           : ProveedoresService,
  	public dialogRef                     : MatDialogRef<dialogoEditaProducto>,
  	@Inject(MAT_DIALOG_DATA) public data : DialogData
    ) {
  	this.proveedoresList = proveedoresService.getProveedores()
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  edtProducto(row){
  	console.log(row)
	  this.productosService.edtProductos(row)
    this.dialogRef.close()
  }
}






@Component({
  selector    : 'dialogo-crear-producto',
  templateUrl : 'dialogoCrearProducto.html',
  styleUrls   : ['./dialogoCrearProducto.scss']

})
export class dialogoCreaProducto {
	proveedoresList : any           = []
  constructor(
  	private productosService             : ProductosService,
  	private proveedoresService           : ProveedoresService,
  	public dialogRef                     : MatDialogRef<dialogoCreaProducto>,
  	@Inject(MAT_DIALOG_DATA) public data : DialogData
    ) {
  	this.proveedoresList = proveedoresService.getProveedores()
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  addProducto(row){
  	console.log(row)
	  this.productosService.newProducto(row)
    this.dialogRef.close()
  }
}