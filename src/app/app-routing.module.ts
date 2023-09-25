import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LibraryComponent } from './library/library.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';

const routes: Routes = [
  {path: '', component: LibraryComponent},
  {path: 'login', component: LoginComponent},
  {path: 'library', component: LibraryComponent},
  {path: 'catalog', component: BookListComponent},
  {path: 'book-details', component: BookDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
