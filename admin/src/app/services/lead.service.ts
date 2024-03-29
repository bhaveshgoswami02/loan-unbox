import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CommonService } from './common.service';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  collection: string = "leads"

  constructor(public db: AngularFirestore, public router: Router, public common: CommonService, public auth: AuthService) { }

  add(data: any) {
    this.common.showLoader()
    data.timestamp = firebase.firestore.Timestamp.now()
    data.uid = this.auth.getUid()
    return this.db.collection(this.collection).add(data).then(res => {
      this.router.navigateByUrl("/" + this.collection)
      this.common.showToast("success", "", "Added Successful!")
      alert("Lead add successful")
    }).catch(err => {
      this.common.showToast("error", "", err)
      return err;
    }).finally(() => {
      this.common.stopLoader()
    })
  }

  getAll(state:string) {
    if(state == 'All') {
      return this.db.collection(this.collection, ref => ref.orderBy("timestamp", "desc")).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      )
    }
    else
    {
      return this.db.collection(this.collection, ref => ref.where("address_details.state","==",state).orderBy("timestamp", "desc")).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      )
    }
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

  update(id: string, data: any) {
    this.common.showLoader()
    return this.db.collection(this.collection).doc(id).update(data).then(res => {
      return res
    }).catch(err => {
      this.common.showToast("error", "Error", err)
      return err;
    }).finally(() => {
      this.common.showToast("success", "Successful", "Updated!")
      this.common.stopLoader()
    })
  }

  delete(id: any) {
    this.common.showLoader()
    let path = this.collection + "/" + id + "/" + this.collection;
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
