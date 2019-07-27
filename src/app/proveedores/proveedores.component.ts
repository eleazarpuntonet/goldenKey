import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ProveedoresService } from '../proveedores.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'dtable-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})


export class ProveedoresComponent implements OnInit {
	displayedColumns: string[] = ['select','id', 'proveedor', 'pais', 'telefono','action'];
	dataSource : any           = []
	selection = new SelectionModel<ProveedoresElements>(true, []);
	constructor(
		private proveedoresService : ProveedoresService,
		public dialog: MatDialog){
		this.dataSource = new MatTableDataSource<ProveedoresElements>(proveedoresService.getProveedores());
	}

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator

	ngOnInit() {
	  this.dataSource.paginator = this.paginator
	}

	openDialog(row){
		const dialogRef = this.dialog.open(dialogoEditaProveedor, {
		  width: '350px',
		  data: {
		  	id        : row.id,
		  	proveedor : row.proveedor,
		  	pais      : row.pais,
		  	telefono  : row.telefono,
		  }
		})

		dialogRef.afterClosed().subscribe(result => {
			this.selection.clear()
			this.reloadData()
		})
	}

	delProveedor(row){
		this.proveedoresService.delProveedor(row.id)
		this.reloadData()
	}

	reloadData(){
		this.dataSource = new MatTableDataSource<ProveedoresElements>(this.proveedoresService.getProveedores());
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
	checkboxLabel(row?: ProveedoresElements): string {
	  if (!row) {
	    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
	  }
	  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
	}

	massDelProveedor(selecciones){
		this.proveedoresService.massDelProveedor(selecciones)
		this.selection.clear()
		this.reloadData()
	}

	edtProveedor(row){
		const dialogRef = this.dialog.open(dialogoEditaProveedor, {
		  width: '350px',
		  data: {
		  	id        : row.id,
		  	proveedor : row.proveedor,
		  	pais      : row.pais,
		  	telefono  : row.telefono,
		  }
		})
	  this.proveedoresService.edtProveedores(row)
		this.reloadData()
	}

	crearProveedor(row){
		const dialogRef = this.dialog.open(dialogoCreaProveedor, {
		  width: '350px',
		  data: {}
		})

		dialogRef.afterClosed().subscribe(result => {
			this.selection.clear()
			this.reloadData()
		})
	}
}

export interface ProveedoresElements {
  id        : number;
  proveedor : string;
  pais      : string;
  telefono  : number;
}









export interface DialogData {
  proveedor: Object
}
@Component({
  selector    : 'dialogo-editar-proveedor',
  templateUrl : 'dialogoEditarProveedor.html',
  styleUrls   : ['./dialogoEditarProveedor.scss']

})
export class dialogoEditaProveedor {

  constructor(
  	private proveedoresService : ProveedoresService,
    public dialogRef: MatDialogRef<dialogoEditaProveedor>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close()
  }

  edtProveedor(row){
 	  this.proveedoresService.edtProveedores(row)
    this.dialogRef.close()
  }
}










export interface DialogDataCreate {
  proveedor: Object
}
@Component({
  selector    : 'dialogo-crear-proveedor',
  templateUrl : 'dialogoCrearProveedor.html',
  styleUrls   : ['./dialogoCrearProveedor.scss']

})
export class dialogoCreaProveedor {
  constructor(
  	private proveedoresService : ProveedoresService,
    public dialogRef: MatDialogRef<dialogoCreaProveedor>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataCreate) {}

  cancelClick(): void {
    this.dialogRef.close()
  }

  addProveedor(row){
 	  this.proveedoresService.newProveedor(row)
  }
}