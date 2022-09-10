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
export class LeadsService {
  collection:string = "leads"

  constructor(public db: AngularFirestore, public router: Router, public common: CommonService,public afAuth:AngularFireAuth) { }





  getAllByUserCode(connectorCode:any) {
    return this.db.collection(this.collection, ref => ref.orderBy("timestamp", "desc").where('connector_code','==',connectorCode)).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    )
  }



  getAllByUserCodeandState(state:any,connectorCode:any) {
    return this.db.collection(this.collection, ref => ref.orderBy("timestamp", "desc").where('connector_code','==',connectorCode).where("address_details.state","==",state)).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
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
      this.common.showToast("success", "Successful", "Updated!")
      this.common.stopLoader()
    })
  }




}
