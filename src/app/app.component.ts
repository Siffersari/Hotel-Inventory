import { AfterViewInit, Component, ElementRef, Inject, OnInit, Optional, ViewChild, ViewContainerRef } from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { LoggerService } from './logger.service';
import { localStorageToken } from "./localstorage.token";
import { InitService } from './init.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hotelinventoryapp';

  role = 'Admin'

  @ViewChild('name', {static: true}) name!: ElementRef;


  constructor(@Optional() private loggerService: LoggerService, @Inject(localStorageToken) private localStorage: Storage,
  private initService: InitService ) {
    console.log("initService.config", initService.config);
    
  }


  ngOnInit(): void {
    this.loggerService?.log('Hello World')
    this.name.nativeElement.innerText = 'John'

    this.localStorage.setItem('name', 'Hilton Hotel')
    
  }

  // @ViewChild('user', {read: ViewContainerRef}) vcr!: ViewContainerRef;

  // ngAfterViewInit(): void {
  //     const componentRef = this.vcr.createComponent(RoomsComponent)
  //     componentRef.instance.numberOfRooms = 50
  // }
}
