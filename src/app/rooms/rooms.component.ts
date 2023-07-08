import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnDestroy, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked {

  constructor(@SkipSelf() private roomServices: RoomsService, private configService: ConfigService) { 
    
  }

  hotelName = 'Hilton Hotel';

  numberOfRooms = 120;

  hideRooms = true;

  selectedRoom!: RoomList ;

  rooms: Room = {
    availableRooms: 90,
    bookedRooms: 20,
    totalRooms: 120
  }

  roomList: RoomList[] = []

  subscription !: Subscription

  error$ = new Subject<string>();

  getError$ = this.error$.asObservable();

  rooms$ = this.roomServices.getRooms$.pipe(
    catchError((error) => {
      console.log("error", error);

      this.error$.next(error.message);

      return of ([])
    })
  );

  roomsCount$ = this.roomServices.getRooms$.pipe(
    map(rooms => rooms.length)
  )

  stream = new Observable<string>(observer => {
    observer.next('User 1')
    observer.next('User 2')
    observer.next('User 3')
    observer.complete()
    // observer.error('error')
  })

  title = 'Room List';

  totalBytes = 0;

  ngOnInit(): void {
    this.roomServices.getPhotos().subscribe(
      (event) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Request success!');
            break;
          case HttpEventType.DownloadProgress:
            this.totalBytes = event.loaded;
            break;

          case HttpEventType.Response:
            console.log('Response received!', event.body);
          
        }
            
      }
    )

    // this.subscription = this.roomServices.getRooms$.subscribe( rooms => this.roomList = rooms);

    // this.stream.subscribe({
    //   next: value => console.log(value),
    //   complete: () => console.log('Complete'),
    //   error: error => console.log(error)
    // })

    // this.stream.subscribe(data => console.log(data))

    // console.log("this.roomServices.getRooms()", this.roomServices.getRooms());
    
  }
  
  ngAfterViewChecked(): void {
    this.headerComponent.title = 'Roomz View'

    this.headerChildrenComponent.last.title = 'Last Title'


    console.log("this.headerChildrenComponent", this.headerChildrenComponent);
    

    // this.headerChildrenComponent.forEach((headerComponent) => {
    //   headerComponent.title = 'Roomz View'
    // }
    // )

  }
  ngAfterViewInit(): void {
    console.log("After View Init");
    
    
  }
  ngDoCheck(): void {
    console.log("Do Check")
  }

  // roomServices = new RoomsService();

 

  

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  @ViewChild(HeaderComponent)
  headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;



  addRoom() {
    const room: RoomList = {
      roomType: 'Quad',
      amenities: 'TV, AC, WiFi',
      price: 4000,
      photos: 'https://images.unsplash.com/photo-1581091015771-4d7d3e8e9d3b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2luZ2xlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
      checkinTime: new Date('2021-07-01T10:00:00'),
      checkoutTime: new Date('2021-07-01T12:00:00'),
      rating: 4.5
    }

    // this.roomList.push(room)

    // this.roomList = [...this.roomList, room]

    this.roomServices.addRoom(room).subscribe(
      (data) => this.roomList = data
    )

  }


  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Quad',
      amenities: 'TV, AC, WiFi',
      price: 1500,
      photos: 'https://images.unsplash.com/photo-1581091015771-4d7d3e8e9d3b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2luZ2xlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
      checkinTime: new Date('2021-07-01T10:00:00'),
      checkoutTime: new Date('2021-07-01T12:00:00'),
      rating: 4.5
    }

    this.roomServices.editRoom(room).subscribe(
      (data) => this.roomList = data
    )
  }

  deleteRoom() {
    this.roomServices.deleteRoom('3').subscribe(
      (data) => this.roomList = data
    )
  }


  increaseNumberOfRooms() {
    this.numberOfRooms++;
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Rooms List'
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }
  
}
