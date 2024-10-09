import { Routes } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { InvaliddataComponent } from './invaliddata/invaliddata.component';

export const routes: Routes = [
  { path: 'invaliddata', component: InvaliddataComponent },
  // Other routes will go here
  { path: '**', component: PagenotfoundComponent }
];