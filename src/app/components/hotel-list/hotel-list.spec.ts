import { Component } from '@angular/core';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.html',
  styleUrls: ['./hotel-list.css']
})
export class HotelListComponent {
  searchText = '';
  selectedFilter = 'all';

  properties = [
    {
      id: '41365364',
      name: 'Hotel Vista',
      address: '3-12 Ayodhya nagara, Jntu Hyderabad Telangana',
      status: 'LIVE'
    },
    {
      id: '41265364',
      name: 'Hotel Grand Bloom',
      address: '19-3-15, beside Yazh Banquet Hall, Kakatiya Nagar, Tirupati, Andhra Pradesh',
      status: 'LIVE'
    }
  ];

  filteredProperties = [...this.properties];

  searchProperty() {
    this.filteredProperties = this.properties.filter(p =>
      p.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      p.id.includes(this.searchText)
    );
  }
}
