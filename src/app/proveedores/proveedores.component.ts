import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ProveedoresService } from '../proveedores.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'dtable-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})


export class ProveedoresComponent implements OnInit {
	displayedColumns: string[] = ['id', 'proveedor', 'pais', 'telefono','action'];
	dataSource : any = []

	constructor(
		private proveedoresService : ProveedoresService,
		public dialog: MatDialog
		){
		this.dataSource = new MatTableDataSource<ProveedoresElements>(proveedoresService.getProveedores());
	}

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

	ngOnInit() {
	  this.dataSource.paginator = this.paginator;
	}

	edtProveedor(row){
		console.log(row)

		const dialogRef = this.dialog.open(dialogoEditaProveedor, {
		  width: '250px',
		  data: {valor: 'row'}
		});

		dialogRef.afterClosed().subscribe(result => {
		  console.log('The dialog was closed');
		  console.log(result)
		});
	}

	delProveedor(row){
		this.proveedoresService.delProveedor(row.id)
		
	}
}

export interface ProveedoresElements {
  id : number;
  proveedor : string;
  pais : string;
  telefono : number;
}









export interface DialogData {
  valor: string;
}
@Component({
  selector: 'ddialogo-editar-proveedor',
  templateUrl: 'dialogoEditarProveedor.html',
})
export class dialogoEditaProveedor {

  constructor(
    public dialogRef: MatDialogRef<dialogoEditaProveedor>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}