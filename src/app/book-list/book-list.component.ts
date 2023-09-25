import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from '../services/login.service';
import { BookService } from '../services/book.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import {  Input, Output} from '@angular/core';
import { LibraryService } from '../services/library.service';
import { BookDetailsComponent } from '../book-details/book-details.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddLibraryDialogComponent } from '../add-library-dialog/add-library-dialog.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {

  constructor(private loginService:LoginService, private libraryService:LibraryService,private dialog:MatDialog, private bookService : BookService){
  }

  displayedColumns: string[] = ['title'];
  dataSource = new MatTableDataSource();

  ngOnInit(): void {
    /*
      this.loginService.checkToken();
      this.libraryService.getLibrary().subscribe(result => {
      this.dataSource.data = result;
      console.log(result)
      })
*/
      this.loginService.checkToken();
      this.bookService.getAll().subscribe(result => {
      this.dataSource = result
      console.log(result);
      })

  }

  getBookDetail(row: any) {
    console.log(row);
    this.bookService.getBookDetails(row.isbn).subscribe({
      next : (data) => {

        const dialogRef = this.dialog.open(AddLibraryDialogComponent, {
          data: data
        });
        dialogRef.afterClosed().subscribe(result => {
        });
      },
      error : (error) => {
        console.log(error)
      }
    })
  }

  addBook() {
    const dialogRef = this.dialog.open(BookListComponent, {});
    dialogRef.afterClosed().subscribe(result => {
    });
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }



}


/*
  constructor(private loginService:LoginService,private bookService: BookService){
  }


  displayedColumns: string[] = ['title', 'author', 'isbn', 'plot'];
  dataSource = new MatTableDataSource();

  ngOnInit(): void {
    this.loginService.checkToken();
    this.bookService.getAll().subscribe(result => {
        this.dataSource = result;
      }
    )
  }

  addBook() {
  throw new Error('Method not implemented.');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
*/
