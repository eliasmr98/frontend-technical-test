import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { TableComponent } from './components/table/table.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

export const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'table', component: TableComponent },
  { path: '**', component: ErrorPageComponent },
];
