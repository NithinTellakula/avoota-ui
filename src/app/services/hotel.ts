import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// --- Models ---
export interface Rateplan {
  id: number;
  code: string;
}

export interface Room {
  id: number;
  name: string;
  description: string;
  active: boolean;
  rateplans: Rateplan[];
}

export interface Hotel {
  id: number;
  name: string;
  address: string;
  rooms: Room[];
}

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  // ✅ Full hotel structure from HEAD
  private hotels: Hotel[] = [
    {
      id: 41365364,
      name: 'Hotel Vista',
      address: '3-12 Ayodhya nagara JNTU Hyderabad Telangana',
      rooms: [
        {
          id: 1,
          name: 'Twin Bed Room',
          description: 'clean and neat',
          active: true,
          rateplans: [{ id: 1, code: 'EP' }, { id: 2, code: 'MP' }, { id: 3, code: 'CP' }]
        },
        {
          id: 2,
          name: 'Beach Room',
          description: 'Beach Room',
          active: true,
          rateplans: [{ id: 4, code: 'MP' }, { id: 5, code: 'CP' }]
        }
      ]
    },
    {
      id: 87451235,
      name: 'Hotel Sunshine',
      address: '5-10 MG Road, Vijayawada, Andhra Pradesh',
      rooms: [
        {
          id: 1,
          name: 'Deluxe Room',
          description: 'spacious with city view',
          active: true,
          rateplans: [{ id: 6, code: 'EP' }, { id: 7, code: 'CP' }]
        }
      ]
    },
    {
      id: 99256321,
      name: 'Hotel Paradise',
      address: '10-24 Beach View Road, Vizag, Andhra Pradesh',
      rooms: []
    }
  ];

  // ============================
  //   COMMON SERVICE METHODS
  // ============================

  /** Return list of all hotels (for header) */
  getHotels(): Observable<Hotel[]> {
    return of(this.hotels);
  }

  /** Return hotel by ID */
  getHotelById(id: number): Observable<Hotel | undefined> {
    return of(this.hotels.find(h => h.id === id));
  }

  /** Returns the first hotel (default) */
  getHotel(): Observable<Hotel> {
    return of(structuredClone(this.hotels[0]));
  }

  /** Toggle active/inactive state of a room */
  toggleActive(hotelId: number, roomId: number): Observable<void> {
    const hotel = this.hotels.find(h => h.id === hotelId);
    const room = hotel?.rooms.find(r => r.id === roomId);
    if (room) room.active = !room.active;
    return of();
  }

  /** Edit a room name/description */
  editRoom(
    hotelId: number,
    roomId: number,
    data: Partial<{ name: string; description: string }>
  ): Observable<void> {
    const hotel = this.hotels.find(h => h.id === hotelId);
    const room = hotel?.rooms.find(r => r.id === roomId);

    if (room) Object.assign(room, data);

    return of();
  }

  /** Add new rate plan to a room */
  addRateplan(hotelId: number, roomId: number, code: string): Observable<void> {
    const hotel = this.hotels.find(h => h.id === hotelId);
    const room = hotel?.rooms.find(r => r.id === roomId);

    if (room) {
      const nextId = Math.max(...room.rateplans.map(rp => rp.id), 0) + 1;
      room.rateplans.push({ id: nextId, code });
    }

    return of();
  }

  /** Create new room in a hotel */
  createRoom(hotelId: number, name: string, description: string): Observable<void> {
    const hotel = this.hotels.find(h => h.id === hotelId);
    if (hotel) {
      const nextId = Math.max(...hotel.rooms.map(r => r.id), 0) + 1;
      hotel.rooms.push({
        id: nextId,
        name,
        description,
        active: true,
        rateplans: []
      });
    }
    return of();
  }

  addHotel(hotel: Hotel) {
    this.hotels.push(hotel);
  }
}
