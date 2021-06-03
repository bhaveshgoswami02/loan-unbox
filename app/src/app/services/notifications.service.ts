import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CommonService } from './common.service';
import { StorageService } from './storage.service';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  collection:string = "notifications"

  constructor(public db: AngularFirestore, public storage: StorageService, public router: Router, public common: CommonService,public auth:AuthService) { }

  getAll() {
    return this.db.collection(this.collection,ref=>ref.orderBy("timestamp","desc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    )
  }

  getSingleUserNotifications() {
    return this.db.collection("single-notifications",ref=>ref.where("uid","==",this.auth.getUid()).orderBy("timestamp","desc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    )
  }

}
