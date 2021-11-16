import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IChatBoom, IMessage } from 'src/app/models';
import { ChatService } from 'src/app/services/chat.service';
import { Router, ActivatedRoute, NavigationEnd, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnInit, OnDestroy {
  private subsciption: Subscription = new Subscription();

  public rooms$: Observable<Array<IChatBoom>>;
  public messages$: Observable<Array<IMessage>>;

  constructor(
    private chatService: ChatService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 

    this.rooms$ = this.chatService.getRooms();

    const roomId: string = activatedRoute.snapshot.url[1].path;

    this.messages$ = this.chatService.getRoomMessages(roomId);
    
    console.log("room id ", roomId);
    console.log("this.messages$ ",this.messages$);

    this.subsciption.add(
      router.events
      .pipe(filter((data) => data instanceof NavigationEnd))
        .subscribe((data) => {
          console.log(data);
          
          const routeEvent: RouterEvent = <RouterEvent>data;
          const urlArr = routeEvent.url.split('/');
          if (urlArr.length >= 2) {
            this.messages$ = this.chatService.getRoomMessages(urlArr[2])
            console.log("this.messages$ ",this.messages$);
            
          }
        })
    )
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subsciption.unsubscribe()
  }
}
