import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  templateUrl: './hotel-list.html',
  styleUrls: ['./hotel-list.css'],
  imports: [CommonModule, FormsModule]
}) 
export class HotelListComponent implements OnInit {

  hotels: any[] = [];
  search: string = "";

  constructor(private router: Router) {}

  ngOnInit() {
    this.hotels = JSON.parse(localStorage.getItem('hotels') || '[]');
  }

  addHotel() {
    this.router.navigate(['/add-hotel']);
  }
}