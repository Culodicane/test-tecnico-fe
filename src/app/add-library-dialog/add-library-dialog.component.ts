import { LibraryService } from './../services/library.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { BookService } from '../services/book.service';
import { LoginService } from '../services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';



export interface PeriodicElement {
  title: string;
  author: string;
  isbn: string;
  plot: string;
}

@Component({
  selector: 'app-add-library-dialog',
  templateUrl: './add-library-dialog.component.html',
  styleUrls: ['./add-library-dialog.component.css']
})

export class AddLibraryDialogComponent {

  onSubmit() {
    this.libraryService.addLibrary(this.bookForm.value).subscribe({
      next : result => {console.log(result)},
      error : error => {console.log(error)}
    })
  }

  bookForm = new FormGroup({
    title : new FormControl('', Validators.required),
    isbn : new FormControl('', Validators.required),
    author : new FormControl('', Validators.required),
    plot : new FormControl('', Validators.required),
    dateAdded : new FormControl(new Date(), Validators.required),
    timesRead : new FormControl('', Validators.required),
    idUser : new FormControl(this.userId, Validators.required),
  })


  constructor(private loginService:LoginService, public dialogRef: MatDialogRef<BookDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public userId: any, private bookService : BookService, private libraryService : LibraryService){
  }

  ngOnInit(): void {

  }

  closeDialog() {
    this.dialogRef.close([]);
  }
}
