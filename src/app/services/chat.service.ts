import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IChatBoom } from '../models/index';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private _db: AngularFirestore) { }

  public getRooms(): Observable<Array<IChatBoom>> {
    return this._db.collection('rooms').snapshotChanges().pipe(
      map((snap) => {
        return snap.map((snap) => {
          const id = snap.payload.doc.id;
          const data: IChatBoom = <IChatBoom>snap.payload.doc.data();
          return <IChatBoom>{
            ...data,
            id,
          };
        });
      })
      );
  }
}
