import { Routes } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

export const routes: Routes = [
  // Other routes will go here
  { path: '**', component: PagenotfoundComponent }
];