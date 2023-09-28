import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {BookDetailsComponent} from "../book-details/book-details.component";


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {

  dialogTitle = "Credenziali Errate";
  dialogMessage : any;

  constructor(public dialogRef: MatDialogRef<BookDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any){
  }

  closeDialog() {
    this.dialogRef.close([]);
  }

  ngOnInit(): void {
    console.log(this.data);
    this.dialogMessage = this.data.errore;
  }


}
