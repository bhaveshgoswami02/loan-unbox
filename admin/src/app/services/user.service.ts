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
      return this.db.collection(this.collection,ref=>ref.orderBy("timestamp","desc")).get().pipe(
        map(actions => actions.docs.map(a => {
          const data = a.data() as any;
          const id = a.id;
          return { id, ...data };
        }))
      )
    }
    else
    {
      return this.db.collection(this.collection,ref=>ref.where("address_details.state","==",state).orderBy("timestamp","desc")).get().pipe(
        map(actions => actions.docs.map(a => {
          const data = a.data() as any;
          const id = a.id;
          return { id, ...data };
        }))
      )
    }
  }

}
