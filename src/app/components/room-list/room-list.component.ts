import { Component, OnInit, Input } from '@angular/core';
import { IChatBoom } from 'src/app/models';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  @Input() rooms:Array<IChatBoom> = []
  constructor() { }

  ngOnInit(): void {
  }

}
