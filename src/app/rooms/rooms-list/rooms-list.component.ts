import { RoomList } from './../rooms';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnChanges, OnDestroy {
  ngOnDestroy(): void {
    console.log("On Destroy");
  }
  @Input() rooms: RoomList[] | null = []

  @Input() title: string = '';

  @Output() selectedRoom = new EventEmitter<RoomList>(); 


  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    const {title} = changes;

    if (title) {
      this.title = title.currentValue.toUpperCase();
    }

    

    // console.log("changes", changes);
    
    
  }


  selectRoom(room: RoomList) {
    this.selectedRoom.emit(room);
  }
}
