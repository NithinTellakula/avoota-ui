import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HotelService, Hotel } from '../services/hotel';

@Component({
  selector: 'app-hotel-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hotel-header.html',
  styleUrls: ['./hotel-header.css']
})
export class HotelHeaderComponent implements OnInit {
  hotels: Hotel[] = [];
  selectedHotel?: Hotel;
  selectedHotelId: number | null = null;

  showCreateForm = false;
  newRoomName = '';
  newRoomDesc = '';

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.hotelService.getHotels().subscribe(list => {
      this.hotels = list;
      this.selectedHotel = list[0];
      this.selectedHotelId = list[0].id;
    });
  }

  onSelectHotel(id: number) {
    this.hotelService.getHotelById(id).subscribe(h => {
      if (h) {
        this.selectedHotel = h;
        this.selectedHotelId = h.id;
      }
    });
  }

  toggleCreateRoom() {
    this.showCreateForm = !this.showCreateForm;
  }

  createRoom() {
    if (!this.newRoomName.trim()) return alert('Enter room name');
    alert(`Room "${this.newRoomName}" created for ${this.selectedHotel?.name}`);
    this.newRoomName = '';
    this.newRoomDesc = '';
    this.showCreateForm = false;
  }
}
