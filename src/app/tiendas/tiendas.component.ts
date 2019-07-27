import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ProductosService } from '../productos.service';
import { ProveedoresService } from '../proveedores.service';
import { TiendasService } from '../tiendas.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.scss']
})
export class TiendasComponent implements OnInit {

	displayedColumns: string[] = ['select','id', 'nombre', 'direccion','action'];
	dataSource : any           = []
	selection = new SelectionModel<TiendasElements>(true, []);

	constructor(
		private tiendaService : TiendasService,
		public dialog: MatDialog){
		this.dataSource = new MatTableDataSource<TiendasElements>(tiendaService.getTiendas());
	}

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator

	ngOnInit() {
	  this.dataSource.paginator = this.paginator
	}

	openEdtDialog(row){
		const dialogRef = this.dialog.open(dialogoEditaTiendas, {
		  width: '350px',
		  data: {
		  	id           : row.id,
		  	nombre       : row.nombre,
		  	direccion  : row.direccion,
		  }
		})

		dialogRef.afterClosed().subscribe(result => {
			this.selection.clear()
			this.reloadData()
		})
	}

	delTienda(row){
		this.tiendaService.delTienda(row.id)
		this.reloadData()
	}

	massDelTienda(selection){
		this.tiendaService.massDelTiendas(selection)
		this.selection.clear()
		this.reloadData()
	}

	crearTienda(){
		const dialogRef = this.dialog.open(dialogoCrearTienda, {
		  width: '350px',
		  data: {}
		})

		dialogRef.afterClosed().subscribe(result => {
			this.selection.clear()
			this.reloadData()
		})
	}

	reloadData(){
		this.dataSource = new MatTableDataSource<TiendasElements>(this.tiendaService.getTiendas());
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
	checkboxLabel(row?: TiendasElements): string {
	  if (!row) {
	    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
	  }
	  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
	}
}
export interface TiendasElements {
  id           : number;
  nombre       : string;
  direccion  : string;
}



export interface DialogData {
  tienda: Object
}
@Component({
  selector    : 'dialogo-editar-tienda',
  templateUrl : 'dialogoEditarTienda.html',
  styleUrls   : ['./dialogoEditarTienda.scss']

})
export class dialogoEditaTiendas {
  constructor(
		private tiendaService : TiendasService,
  	public dialogRef                     : MatDialogRef<dialogoEditaTiendas>,
  	@Inject(MAT_DIALOG_DATA) public data : DialogData
    ) {
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  edtTienda(row){
  	this.tiendaService.edtTiendas(row)
    this.dialogRef.close()

  }
}

@Component({
  selector    : 'dialogo-crear-tienda',
  templateUrl : 'dialogoCrearTienda.html',
  styleUrls   : ['./dialogoCrearTienda.scss']

})
export class dialogoCrearTienda {
  constructor(
		private tiendaService : TiendasService,
  	public dialogRef                     : MatDialogRef<dialogoCrearTienda>,
  	@Inject(MAT_DIALOG_DATA) public data : DialogData
    ) {
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  addTienda(row){
		  this.tiendaService.newTienda(row)
	    this.dialogRef.close()
  }
}