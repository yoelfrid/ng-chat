import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { IMessage } from 'src/app/models';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling/virtual-scroll-viewport';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild("virtualScroll") virtualScroll?: CdkVirtualScrollViewport;

  @Output() onSendMessage: EventEmitter<string> = new EventEmitter();

  public userId:string = ""

  @Input() set messages( messages: Array<IMessage>){
    this._messages = messages.sort((x,y) => {
    return x.timestamp - y.timestamp
  });
  this.virtualScroll?.scrollToIndex(this._messages.length - 1)
  }

  private _messages: Array<IMessage> = [];

  get messages() {
    return this._messages
  }
  constructor(private authService:AuthService) { 
    this.userId = authService.getUserId()
  }

  ngOnInit(): void {
    console.log("messages ", this.userId);

    console.log("messages ", this.messages);

  }
  public sendMessage(message: string, input: HTMLInputElement): void {
    this.onSendMessage.emit(message)
    input.value = '';
  }
}
