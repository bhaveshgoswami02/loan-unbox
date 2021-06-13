import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import * as firebase from 'firebase';
import { AuthService } from './services/auth.service';


@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  uid=localStorage.getItem("uid")?.toString()
  constructor(public db: AngularFirestore, private http : HttpClient,public auth:AuthService) {}

  add(collection:any, content:any, docName:any) {
    content = {...content, ...{
      created_at : firebase.default.firestore.Timestamp.now().seconds
    }}
    return this.db
      .collection('users')
      .doc(this.uid)
      .collection(collection)
      .doc(docName)
      .set(content);
  }

  update(collection:any, id:any, content:any) {
    content = {...content, ...{
      updated_at : firebase.default.firestore.Timestamp.now().seconds
    }}
    return this.db
      .collection('users')
      .doc(this.uid)
      .update(content);
  }

  delete(collection:any, id:any) {
    return this.db
      .collection('users')
      .doc(this.uid)
      .delete()
  }

  getAllSnapshotChanges(collection:any ) {
    return this.db
      .collection('users')
      .doc(this.uid)
      .collection(collection)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getAll(collection:any ) {
    return this.db
      .collection('users')
      .doc(this.uid)
      .collection(collection)
      .get()
      .pipe(
        map((actions) =>
          actions.docs.map((a) => {
            const data = a.data() as any;
            const id = a.id;
            return { id, ...data };
          })
        )
      ).toPromise()
  }

  getSingle(collection:any, id:any) {
    return this.db
      .collection('users')
      .doc(this.uid)
      .get()
      .pipe(
        map((a) => {
          const data = a.data() as any;
          const id = a.id;
          return { id, ...data };
        })
      ).toPromise()
  }

//   getSingleDataByValueChanges(id) {
//     return this.db
//       .collection('users')
//       .doc(this.uid)
//       .collection(collection)
//       .doc(id)
//       .valueChanges();
//   }

  sendNotification(token:any, notification:any){
    const httpOptions = {
       headers : new HttpHeaders({
        'Authorization': 'key=AAAAWnwZd-0:APA91bFXoHsnl9zIXnvvHEfsSoyxXgpeiyUBq5okoR4ojYFZ1QB6VDYE7E7SdnRTyfxvMk4mBoeiSApJVBE5Xux0T9c8biQh7CXN0ZRUFHgqW0P6c-Ekeg4rZnnMFDXsbEUlDgtsNiiC',
        'Content-Type':'application/json'
      })
    };
    return this.http.post('https://fcm.googleapis.com/fcm/send',JSON.stringify({
      "notification": {
        "title": notification.title, 
        "body": notification.body,
        "icon" : notification.icon?.url,
        "image" : notification.image?.url,
      },
      "data" : notification.customData,
      "apns":{
        "fcm_option":{
          "image":notification.image?.url,
        }
      },
      "android": {
        "image": notification.image?.url,
      },
      // "click_action" : "https://google.com",
      "to" : token
    }), httpOptions).toPromise()
  }

  async getTimeStamp(){
    let time = await firebase.default.firestore.Timestamp.now().seconds
    return time
  }
}
