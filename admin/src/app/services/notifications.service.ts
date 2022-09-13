import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CommonService } from './common.service';
import firebase from 'firebase';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  collection:string = "notifications"

  constructor(public db: AngularFirestore, public router: Router, public common: CommonService) { }

  add(data: any) {
    this.common.showLoader()
    data.timestamp = firebase.firestore.Timestamp.now()
    return this.db.collection(this.collection).add(data).then(res => {
      this.router.navigateByUrl("/" + this.collection)
      this.sendpush(data)
      this.common.showToast("success", "", "Notification sent Successful!")
    }).catch(err => {
      this.common.showToast("error", "", err)
    }).finally(() => {
      this.common.stopLoader()
    })
  }

  async sendNotificationToSingleUser(data:any) {
    this.common.showLoader()
    console.log(data.uid)
    this.sendpush(data)
    data.timestamp = firebase.firestore.Timestamp.now()
    return this.db.collection("single-notifications").add(data).then(res => {
      this.router.navigateByUrl("/" + this.collection)
      this.common.showToast("success", "", "Notification Sent Successful!")
    }).catch(err => {
      this.common.showToast("error", "", err)
      return err;
    }).finally(() => {
      this.common.stopLoader()
    })
  }

  updateNotificationToSingleUser(id:any,data:any) {
    return this.db.collection("single-notifications").doc(id).update(data).then(res => {
      this.router.navigateByUrl("/" + this.collection)
      this.common.showToast("success", "", "Notification Update Successful!")
    }).catch(err => {
      this.common.showToast("error", "", err)
      return err;
    }).finally(() => {
      this.common.stopLoader()
    })
  }

  getNotificationToSingleUser(id:any) {
    return this.db.collection("single-notifications").doc(id).get().pipe(
      map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      })
    )
  }

  getAll() {
    return this.db.collection(this.collection, ref => ref.orderBy("timestamp", "desc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    )
  }

  getAllSingleUserNotifications() {
    return this.db.collection("single-notifications", ref => ref.orderBy("timestamp", "desc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    )
  }

  getSingle(id: string) {
    return this.db.collection(this.collection).doc(id).get().pipe(
      map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      })
    )
  }

  update(id: string, data: any, img?: any) {
    this.common.showLoader()
    return this.db.collection(this.collection).doc(id).update(data).then(res => {
      return res
    }).catch(err => {
      this.common.showToast("error", "Error", err)
      return err;
    }).finally(() => {
      this.router.navigateByUrl("/" + this.collection)
      this.common.showToast("success", "Successful", "Updated!")
      this.common.stopLoader()
    })
  }

  delete(id: any) {
    this.common.showLoader()
    return this.db.collection(this.collection).doc(id).delete().then(res => {
      return res
    }).catch(err => {
      console.log(err)
      this.common.showToast("error", "", err)
    }).finally(() => {
      this.common.showToast("error", "", "Deleted!")
      this.common.stopLoader()
    })
  }

  deleteNotificationToSingleUser(id: any) {
    this.common.showLoader()
    return this.db.collection("single-notifications").doc(id).delete().then(res => {
      return res
    }).catch(err => {
      console.log(err)
      this.common.showToast("error", "", err)
    }).finally(() => {
      this.common.showToast("error", "", "Deleted!")
      this.common.stopLoader()
    })
  }


  sendpush(data:any){
   if(data.uid){
    this.db.collection("users").doc(data.uid).get().pipe(
        map(a => {
          const data = a.data() as any;
          const id = a.id;
          return { id, ...data };
        }))
      .subscribe((res:any)=>{
      res.pushTokens.forEach((element:any) => {
        this.common.sendNotification(element.token,{title:data.title,body:data.message})
      });
    })
   }else{
    this.db.collection("users").get().pipe(
        map(actions => actions.docs.map(a => {
          const data = a.data() as any;
          const id = a.id;
          return { id, ...data };
        }))
      ).subscribe((res:any)=>{
     res.forEach((user:any) => {
      if(user.pushTokens){
        user.pushTokens.forEach((element:any) => {
          console.log("sending to ",element.token)
          this.common.sendNotification(element.token,{title:data.title,body:data.message})
        });
      }
     });
    })
   }
  }

}
