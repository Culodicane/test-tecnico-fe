import { BookService } from './../services/book.service';
import { Component, Inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {

  title : any;
  isbn : any;
  timesRead : any;
  dateAdded : any;
  dateDeleted : any;
  plot : any;
  author : any

  constructor(private loginService:LoginService, public dialogRef: MatDialogRef<BookDetailsComponent>, @Inject(MAT_DIALOG_DATA) public bookData: any, private bookService : BookService){
  }

  ngOnInit(): void {

    console.log(this.bookData)

    this.loginService.checkToken();
    this.title = this.bookData.title;
    this.plot = this.bookData.plot;
    this.author = this.bookData.author;
    this.isbn = this.bookData.isbn
    console.log(this.bookData)
  }

}

