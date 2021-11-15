import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-heder',
  templateUrl: './heder.component.html',
  styleUrls: ['./heder.component.scss']
})
export class HederComponent implements OnInit {

  public isLoggedIn$: Observable<boolean>

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  ngOnInit(): void { }

  public loginWithGoogle(): void {
    this.authService.signInWithGoogle();
  }

  public signOut(): void {
    this.authService.signOut();
  }
}
