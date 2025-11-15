import { Routes } from '@angular/router';
import { HotelListComponent } from './components/hotel-list/hotel-list';
import { AddHotelComponent } from './components/add-hotel/add-hotel';

export const routes: Routes = [
  { path: '', component: HotelListComponent },
  { path: 'hotels', component: HotelListComponent },
  { path: 'add-hotel', component: AddHotelComponent }
];
