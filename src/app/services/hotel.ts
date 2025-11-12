import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  hotels:any[] = [];

  addHotel(hotel:any) {
    this.hotels.push(hotel);
  }

  getHotels() {
    return this.hotels;
  }

  getHotelById(id:any){
    return this.hotels.find(h => h.id == id);
  }
}
