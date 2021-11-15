import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatContainerComponent } from './components/chat-container/chat-container.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'chat', component: ChatContainerComponent, canActivate: [AuthGuardService] },
  { path: 'chat/:roomId', component: ChatContainerComponent, canActivate: [AuthGuardService] },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
