import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { FormsModule } from '@angular/forms';
import { RoomsComponent } from './rooms.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';
import { RoomAddComponent } from './room-add/room-add.component';
import { HeaderModule } from '../header/header.module';
import { RouteConfigToken } from '../services/routeConfig.service';



@NgModule({
  declarations: [
    RoomsComponent,
    RoomsListComponent,
    RoomsBookingComponent,
    RoomAddComponent,
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    FormsModule,
    HeaderModule
  ],
  providers: [
    {
      provide: RouteConfigToken,
      useValue: { 
        title: 'Room'
      },
    },
  ]
})
export class RoomsModule { }
