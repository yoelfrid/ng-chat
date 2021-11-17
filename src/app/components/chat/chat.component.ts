import { Component, OnInit, Input, Output ,EventEmitter} from '@angular/core';
import { IMessage } from 'src/app/models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Output() onSendMessage: EventEmitter<string> = new EventEmitter();

@Input() messages:Array<IMessage> = [];

  constructor() { }

  ngOnInit(): void {
    console.log("messages ", this.messages);
    
  }
public sendMessage(message:string):void{
this.onSendMessage.emit(message)   
}
}
