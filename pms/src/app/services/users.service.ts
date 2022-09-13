import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CommonService } from './common.service';
import firebase from 'firebase';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  collection:string = "users"

  constructor(public db: AngularFirestore, public router: Router, public common: CommonService,public afAuth:AngularFireAuth) { }

  getAllByPMSId() {
    let uid = localStorage.getItem('uid')
    console.log(uid)
    return this.db.collection(this.collection, ref => ref.orderBy("updated_at", "desc").where('assignedPmsId','==',uid)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  getAllByPMSIdandState(state:any) {
    let uid = localStorage.getItem('uid')
    console.log(uid)
    return this.db.collection(this.collection, ref => ref.where("address_details.state","==",state).orderBy("updated_at", "desc").where('assignedPmsId','==',uid)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }



  update(id: string, data: any) {
    this.common.showLoader()
    data.updatedAt = firebase.firestore.Timestamp.now()
    return this.db.collection(this.collection).doc(id).update(data).then(res => {
      return res
    }).catch(err => {
      this.common.showToast("error", "Error", err)
      return err;
    }).finally(() => {
      // this.router.navigateByUrl("/" + this.collection)
      this.common.showToast("success", "Successful", "Updated!")
      this.common.stopLoader()
    })
  }


}
