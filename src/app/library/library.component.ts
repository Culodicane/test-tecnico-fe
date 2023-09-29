import { BookService } from './../services/book.service';
import { Router } from '@angular/router';
import { Component, Input, Output, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from '../services/login.service';
import { LibraryService } from '../services/library.service';
import { BookDetailsComponent } from '../book-details/book-details.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AddLibraryDialogComponent } from '../add-library-dialog/add-library-dialog.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

/*
export interface PeriodicElement {
  id: number,
  title : string,
  dateAdded: Date | undefined,
  dateDeleted: Date | undefined,
  timeRead: Number,
  idUser: Number,
  idBook: Number,
  isbn: string
}
*/

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent {

  updateReadTimes(row: any) {
    this.libraryService.updateLibrary(row).subscribe({
      next : result => console.log(result)
    })
    console.log(row);
  }

  restore(row: any) {
    row.dateDeleted = null;
    this.libraryService.updateLibrary(row).subscribe({
      next : result => console.log(result)
    })
    console.log(row);
  }

  delete(row: any) {
    row.dateDeleted = new Date();
    this.libraryService.updateLibrary(row).subscribe({
      next : result => console.log(result)
    })
    console.log(row);
  }

  constructor(private loginService:LoginService, private libraryService:LibraryService,private dialog:MatDialog, private bookService : BookService){
    this.loginService.checkToken();

  }

  displayedColumns: string[] = ['title', 'timesRead', 'dateAdded', 'action'];
  dataSource = new MatTableDataSource<any>();
  idUser : any;

  ngOnInit(): void {
    this.libraryService.getLibrary().subscribe(result => {
      this.dataSource.data = result;
    });
  }

  getBookDetail(row: any) {
    const dialogRef = this.dialog.open(BookDetailsComponent, {
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  addBook() {
    this.loginService.getUserDetails().subscribe({
      next : result => {
          const dialogRef = this.dialog.open(AddLibraryDialogComponent, {
            width: '760px',
          data : JSON.parse(result).idUser
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(result);
          window.location.reload();
        });
      }
    })
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
  }

  protected readonly closed = closed;

  addColumn(checked: boolean) {
    if (checked) {
      let index= this.displayedColumns.length - 1;
      this.displayedColumns.splice(index, 0, 'dateDeleted');
      console.log(this.displayedColumns);
    }
    if (!checked){
      this.displayedColumns = this.displayedColumns.filter(columnName => columnName !== 'dateDeleted');
      console.log(this.displayedColumns);

    }
  }

}
