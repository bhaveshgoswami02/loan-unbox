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
  allData:any = []
  newNotifications:any = []

  constructor(public db: AngularFirestore, public storage: StorageService, public router: Router, public common: CommonService,public auth:AuthService) {
  }

  getAll() {
    return this.db.collection(this.collection,ref=>ref.orderBy("timestamp","desc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    ).subscribe(async res=>{
      this.allData = await this.allData.concat(res)
      this.allData = this.allData.sort((a:any,b:any)=> (a.timestamp > b.timestamp ? -1 : 1))
      this.allData.forEach((element:any) => {
        let timestamp = this.getLastNotification().timestamp.seconds
        if(timestamp < element.timestamp.seconds ) {
          this.newNotifications.push(element)
        }
      });
    })  
  }

  getSingleUserNotifications() {
    return this.db.collection("single-notifications",ref=>ref.where("uid","==",this.auth.getUid()).orderBy("timestamp","desc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    ).subscribe(res=>{
      this.allData = res
      this.getAll()
    })
  }

  setLastNotification(lastNotification:any) {
    localStorage.setItem("lastNotification",JSON.stringify(lastNotification))
  }

  getLastNotification() {
    return JSON.parse(localStorage.getItem('lastNotification') || '{}');
  }

}
