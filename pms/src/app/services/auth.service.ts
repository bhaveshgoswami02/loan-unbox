import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
// import { CommonService } from '../common.service';
import { CommonService } from './common.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth:AngularFireAuth,public db:AngularFirestore,public router:Router,public common:CommonService) {
   }


  async signIn(email:any,password:any){
     this.common.showLoader()
     console.log(email,password)
     const data:any = await this.getUserByEmail(email)
     console.log(data)

     if(data[0]?.isBlocked) {
      this.common.showToast("error","Error","You are Blocked By an Admin")
      this.common.stopLoader()
      return
     }

     return this.afAuth.signInWithEmailAndPassword(email,password).then((res:any)=>{
      localStorage.setItem("uid",res.user.uid)
      localStorage.setItem("email",res.user.email)
      this.common.showToast("success","Successful","You are LoggedIn successfully")
      this.router.navigateByUrl("/")
      return res.user.uid
     }).catch(err=>{
      // code to generate a notification alert of wrong credentials
      this.common.showToast("error","Error",err)
      return err
    }).finally(()=>{
      this.common.stopLoader()
    })
   }

   resetPassword(email:any){
    this.common.showLoader()
    return this.afAuth.sendPasswordResetEmail(email).then(res=>{
      this.router.navigateByUrl("/auth")
      this.common.showToast("success","Reset link Send","Check your email for password reset link")
    }).finally(()=>{
      this.common.stopLoader()
    })
   }

   isAuthenticated(){
    if(localStorage.getItem("uid")){
      return true
    }
    else{
      return false
    }
   }

   logOut(){
      this.common.showLoader()
      localStorage.removeItem("uid")
      localStorage.removeItem("email")
      this.afAuth.signOut()
      window.location.reload()
   }

   getUid(){
     return localStorage.getItem("uid")
   }
   getEmail(){
    return localStorage.getItem("email")
   }

   getProfile(){
     return this.db.collection("users").doc(this.getUid()?.toString()).valueChanges()
   }
   updateProfile(profileInfo:{firstName:string,lastName:string,mobile:string,gender:string}){
     return this.db.collection("users").doc(this.getUid()?.toString()).set(profileInfo).then(res=>{
       this.common.showToast("success","Update Successful","Profile Details Updated Successfully")
       return res
     }).catch(err=>{
      this.common.showToast("error","Error Occoured","Unable to perform this operation")
      return err
     })
   }



   getUserByEmail(emailid:any) {
    return this.db.collection('pms', ref => ref.where('email','==',emailid)).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    ).toPromise()
  }


}
