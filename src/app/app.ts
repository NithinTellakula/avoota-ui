import { Component } from '@angular/core';
import { HotelHeaderComponent } from './hotel-header/hotel-header';
import { RoomsComponent } from './rooms/rooms.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HotelHeaderComponent, RoomsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
