import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AppConfig } from './../../AppConfig/appconfig.interface';
import { APP_SERVICE_CONFIG } from './../../AppConfig/appconfig.service';
import { RoomList } from './../rooms';
import { Inject, Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  roomList: RoomList[] = []


  getRooms$ = this.http.get<RoomList[]>('/api/rooms').pipe(
    shareReplay(1)
  )

  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig, 
  private http: HttpClient) {
    // console.log("config.apiEndpoint", this.config.apiEndpoint);
    console.log('Room Service Intialized');
    
    
   }

  getRooms() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': '1234567890asdfad'
    })

    return this.http.get<RoomList[]>('/api/rooms', {
      headers
    })
  }

  addRoom(room: RoomList) {
    return this.http.post<RoomList[]>('/api/rooms', room)
  }

  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`, room)
  }

  deleteRoom(id: string) {
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`)
  }

  getPhotos() {
    const request = new HttpRequest('GET', 'https://jsonplaceholder.typicode.com/photos', {
      reportProgress: true
      })

      return this.http.request(request)
  }
}
