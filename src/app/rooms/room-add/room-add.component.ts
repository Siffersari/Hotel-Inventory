import { Component } from '@angular/core';
import { RoomList } from '../rooms';
import { RoomsService } from '../services/rooms.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.component.html',
  styleUrls: ['./room-add.component.scss']
})
export class RoomAddComponent {

  constructor(private roomServices: RoomsService) { }

  successMessage !: string

  room: RoomList = {
    roomType: '',
    amenities: '',
    checkinTime: new Date(),
    checkoutTime: new Date(),
    photos: '',
    price: 0,
    rating: 1,
  }

  addRoom(roomsForm: NgForm) {
    this.roomServices.addRoom(this.room).subscribe(data => {this.successMessage ="Room Added Successfully"
    roomsForm.reset();
    // roomsForm.resetForm(
    //   {
    //     roomType: '',
    //     amenities: '',
    //     checkinTime: new Date(),
    //     checkoutTime: new Date(),
    //     photos: '',
    //     price: 0,
    //     rating: 1,
    //   }
    // );
  })
  }

}
