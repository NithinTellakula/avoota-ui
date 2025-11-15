import { Component , signal} from '@angular/core';
import { HotelHeaderComponent } from './hotel-header/hotel-header';
import { RoomsComponent } from './rooms/rooms.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HotelHeaderComponent, RoomsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('hotel-management');
}

