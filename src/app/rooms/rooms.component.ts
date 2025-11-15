import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HotelService, Hotel, Room } from '../services/hotel';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  hotels: Hotel[] = [];
  selectedHotelId!: number;
  hotel?: Hotel;

  editingId: number | null = null;
  editName = '';
  editDesc = '';
  newRate = '';
  showNewRoom = false;
  newName = '';
  newDesc = '';

  constructor(private svc: HotelService) {}

  ngOnInit(): void {
    this.svc.getHotels().subscribe((list: Hotel[]) => {
      this.hotels = list;
      this.selectedHotelId = list[0].id;
      this.load();
    });
  }

  /** Load the selected hotel */
  load() {
    this.svc.getHotelById(this.selectedHotelId).subscribe((h: Hotel | undefined) => {
      if (h) this.hotel = h;
    });
  }

  /** When user selects another hotel from dropdown */
  onHotelChange(id: number) {
    this.selectedHotelId = id;
    this.load();
  }

  /** Toggle Active/Inactive */
  toggle(room: Room) {
    if (!this.hotel) return;
    this.svc.toggleActive(this.hotel.id, room.id).subscribe(() => {
      room.active = !room.active;
    });
  }

  /** Start editing room */
  startEdit(room: Room) {
    this.editingId = room.id;
    this.editName = room.name;
    this.editDesc = room.description;
  }

  /** Save edited room */
  save(room: Room) {
    if (!this.hotel) return;
    this.svc
      .editRoom(this.hotel.id, room.id, { name: this.editName, description: this.editDesc })
      .subscribe(() => {
        room.name = this.editName;
        room.description = this.editDesc;
        this.editingId = null;
      });
  }

  cancelEdit() {
    this.editingId = null;
  }

  /** Add new rateplan */
  addRate(room: Room) {
    if (!this.hotel || !this.newRate.trim()) return;
    const code = this.newRate.toUpperCase();
    this.svc.addRateplan(this.hotel.id, room.id, code).subscribe(() => {
      room.rateplans.push({ id: Date.now(), code });
      this.newRate = '';
    });
  }

  /** Create a new room */
  createRoom() {
    if (!this.hotel || !this.newName.trim()) return;
    this.svc.createRoom(this.hotel.id, this.newName, this.newDesc).subscribe(() => {
      this.newName = this.newDesc = '';
      this.showNewRoom = false;
      this.load();
    });
  }

  
  goToCreateRoom() {
   
    try {
      // Friendly user alert so the button feels responsive but won't break.
      window.alert('Navigation to Create Room is not implemented yet.');
      console.warn('Create Room navigation requested but not implemented.');
    } catch (e) {
      console.warn('Create Room navigation requested but not implemented.');
    }
  }
}
