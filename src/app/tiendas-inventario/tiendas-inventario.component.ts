import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ProductosService } from '../productos.service';
import { ProveedoresService } from '../proveedores.service';
import { TiendasService } from '../tiendas.service';
import { TiendaInventarioService } from '../tienda-inventario.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-tiendas-inventario',
  templateUrl: './tiendas-inventario.component.html',
  styleUrls: ['./tiendas-inventario.component.scss']
})
export class TiendasInventarioComponent implements OnInit {

	displayedColumns: string[] = ['select','id', 'id_producto', 'id_tienda','cantidad','fecha_compra','action'];
	dataSource : any           = []
	selection = new SelectionModel<InventarioElements>(true, []);

	constructor(
		private inventarioTiendasService : TiendaInventarioService,
		public dialog: MatDialog){
		this.dataSource = new MatTableDataSource<InventarioElements>(this.inventarioTiendasService.getInventarioTiendas());
	}

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator

	ngOnInit() {
	  this.dataSource.paginator = this.paginator
	}

	crearInventario(){
		const dialogRef = this.dialog.open(dialogoCreaInventarioTiendas, {
		  width: '350px',
		  data: {
		  id_producto   : 1,
		  id_tienda  		: 1,
		}
		})

		dialogRef.afterClosed().subscribe(result => {
			this.selection.clear()
			this.reloadData()
		})
	}

	openEdtDialog(row){
		const dialogRef = this.dialog.open(dialogoEditaInventarioTiendas, {
		  width: '350px',
		  data: {
		  	id            : row.id,
		  	id_producto   : row.id_producto,
		  	id_tienda  		: row.id_tienda,
		  	cantidad  		: row.cantidad,
		  	fecha_compra : row.fecha_compra
		  }
		})

		dialogRef.afterClosed().subscribe(result => {
			this.selection.clear()
			this.reloadData()
		})
	}

	massDelInventario(selection){
		this.inventarioTiendasService.massDelInventario(selection)
		this.selection.clear()
		this.reloadData()
	}

	delInventario(selection){
		this.inventarioTiendasService.delInventario(selection.id)
		this.reloadData()
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
	checkboxLabel(row?: InventarioElements): string {
	  if (!row) {
	    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
	  }
	  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
	}

	reloadData(){
		this.dataSource = new MatTableDataSource<InventarioElements>(this.inventarioTiendasService.getInventarioTiendas());
		this.dataSource.paginator = this.paginator
	}

}
export interface InventarioElements {
  id           : number;
  nombre       : string;
  direccion  : string;
}

export interface DialogData {
  tienda: Object
}

@Component({
  selector    : 'dialogo-editar-inventario',
  templateUrl : 'dialogoEditarInventario.html',
  styleUrls   : ['./dialogoEditarInventario.scss']
})
export class dialogoEditaInventarioTiendas {
		tiendasList : any           = []
		productosList : any           = []
	  constructor(
			private tiendaService                : TiendasService,
			private proveedoresService           : ProveedoresService,
			private productosService             : ProductosService,
			private inventarioTiendasService : TiendaInventarioService,
			public dialogRef                     : MatDialogRef<dialogoCreaInventarioTiendas>,
			@Inject(MAT_DIALOG_DATA) public data : DialogData
	    ) {
	  	this.tiendasList = tiendaService.getTiendas()
	  	this.productosList = productosService.getProductos()
	  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  edtInventario(row){
		this.inventarioTiendasService.edtInventario(row)
		this.dialogRef.close()
  }
}

@Component({
  selector    : 'dialogo-crear-inventario',
  templateUrl : 'dialogoCrearInventario.html',
  styleUrls   : ['./dialogoCrearInventario.scss']
})
export class dialogoCreaInventarioTiendas {
	tiendasList : any           = []
	productosList : any           = []
  constructor(
		private tiendaService                : TiendasService,
		private proveedoresService           : ProveedoresService,
		private productosService             : ProductosService,
		private inventarioTiendasService : TiendaInventarioService,
		public dialogRef                     : MatDialogRef<dialogoCreaInventarioTiendas>,
		@Inject(MAT_DIALOG_DATA) public data : DialogData
    ) {
  	this.tiendasList = tiendaService.getTiendas()
  	this.productosList = productosService.getProductos()
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  addInventario(row){
		this.inventarioTiendasService.newInventarioValue(row)
		this.dialogRef.close()
  }
}