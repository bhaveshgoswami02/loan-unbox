import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CommonService } from './common.service';
import firebase from 'firebase';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class PmsService {
  collection:string = "pms"

  constructor(public db: AngularFirestore, public router: Router, public common: CommonService,public afAuth:AngularFireAuth) { }

  add(data: any) {
    this.common.showLoader()
    this.afAuth.createUserWithEmailAndPassword(data.email,data.password).then(res => {
      data.createdAt = firebase.firestore.Timestamp.now()
      data.isBlocked=false
      return this.db.collection(this.collection).doc(res?.user?.uid).set(data).then(res => {
        this.router.navigateByUrl("/" + this.collection)
        this.common.showToast("success", "", "PMS added Successfully")
      }).catch(err => {
        this.common.showToast("error", "", err)
      }).finally(() => {
        this.common.stopLoader()
      })
    })


  }




  getAllUnblocked() {
    return this.db.collection(this.collection, ref => ref.orderBy("createdAt", "desc").where('isBlocked','==',false)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }


  getAll() {
    return this.db.collection(this.collection, ref => ref.orderBy("createdAt", "desc")).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }


  getSinglePms(id: string) {
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
    data.createdAt = firebase.firestore.Timestamp.now()
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




}
