import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MeterialModule } from './meterial/meterial.module';

import { environment } from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire/compat'
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { HederComponent } from './components/heder/heder.component';
import { ChatContainerComponent } from './components/chat-container/chat-container.component';
import { ChatComponent } from './components/chat/chat.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HederComponent,
    ChatContainerComponent,
    ChatComponent,
    RoomListComponent,
    AddRoomComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MeterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
