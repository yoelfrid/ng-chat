import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat/app';
import { User } from '../models/user.interface';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggetin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  private userDetails$: Subject<User> = new Subject<User>()

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router) {

      const saveUserString = localStorage.getItem('user')  // בדיקה בתחילת האפליקציה לראות אם המשתמש רשום אם לא הוא יחזיר נאל
        if (saveUserString != null) {
          this.isLoggetin$.next(true)
        }
    afAuth.authState.subscribe(user => {
      if (!!user) {
        this.userDetails$.next(<User>user)
        const userString = JSON.stringify(user)
        localStorage.setItem('user', userString)
        this.isLoggetin$.next(true)
      } else {
        localStorage.removeItem('user')
        this.isLoggetin$.next(false)

      }
    })
  }

  public signInWithGoogle() {   // כניסה עם גוגל ע"י פיירבייס
    this.authLogin(new firebase.default.auth.GoogleAuthProvider())
  }

  
  public signOut(): Promise<void> {     //  signOut
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user')
      this.router.navigate(["/"]);
      this.userDetails$.next(undefined)

    })
  }

  public isLoggedIn(): Observable<boolean> {  //פה אני מחזיר על ידי הפונקציה את המשתמש ולא את המשתמש ישרות כדי שלא יוכלו להגיע לכל המידע
    return this.isLoggetin$.asObservable()
  }

  public getUserData():Observable<User>{
    return this.userDetails$.asObservable()
  }
  
  private authLogin(provider: firebase.default.auth.AuthProvider) { // login
    return this.afAuth.signInWithPopup(provider).then((res) => {
      this.isLoggetin$.next(true);
      this.setUserData(res.user as User)
      this.router.navigate(['chat'])
      // console.log("res ", res);

    });
  }

  private setUserData(user: User): Promise<void> | void {
    if (!user) return;
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user?.uid}`
    );

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    return userRef.set(userData, {
      merge: true
    })
  }

}
