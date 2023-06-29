import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss']
})
export class RoomsBookingComponent implements OnInit {

  id !: number

  id$ = this.router.paramMap.pipe(
    map(params => {
    return params.get('id')
  }));

  constructor(private router: ActivatedRoute) { }

 ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    


  // this.id = this.router.snapshot.params['id']
  
  // this.id$ = this.router.params.pipe(
  //   map(params => params['id'])
  // )

  // this.router.params.subscribe(params => {
  //   const {id} = params;

  //   this.id = id;
    
  // });

 }

}
