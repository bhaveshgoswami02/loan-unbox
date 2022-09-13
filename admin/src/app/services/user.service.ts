import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CommonService } from './common.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  collection:string = "users"

  constructor(public db: AngularFirestore, public router: Router, public common: CommonService) { }

  getAll(state:string) {
    if(state == 'All') {
      return this.db.collection(this.collection,ref=>ref.orderBy("timestamp","desc")).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      )
    }
    else
    {
      return this.db.collection(this.collection,ref=>ref.where("address_details.state","==",state).orderBy("timestamp","desc")).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      )
    }
  }



  update(id: string, data: any) {
    this.common.showLoader()
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
