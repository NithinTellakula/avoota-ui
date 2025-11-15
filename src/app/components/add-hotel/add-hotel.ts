import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-hotel',
  standalone: true,
  templateUrl: './add-hotel.html',
  styleUrls: ['./add-hotel.css'],
  imports: [CommonModule, FormsModule]
})
export class AddHotelComponent {

  hotel = {
    id: '',
    name: '',
    address: ''
  };

  constructor(private router: Router) {}

  saveHotel() {
    const hotels = JSON.parse(localStorage.getItem('hotels') || '[]');
    hotels.push(this.hotel);
    localStorage.setItem('hotels', JSON.stringify(hotels));

    alert('✅ Hotel Saved Successfully!');
    this.router.navigate(['/hotels']);
  }

  goBack() {
    this.router.navigate(['/hotels']);
  }
}
