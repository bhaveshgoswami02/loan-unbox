import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
// import { CommonService } from '../common.service';
import { CommonService } from './common.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth:AngularFireAuth,public db:AngularFirestore,public router:Router,public common:CommonService) {
    // this.afAuth.authState.subscribe((res:any)=>{
    //   if(res){
    //     if(res.uid == 'VhscKjXOlGgS4PutnCC45FjRrN93') {
    //       localStorage.setItem("uid",res.uid)
    //       localStorage.setItem("email",res.email)
    //       // this.router.navigateByUrl("/")
    //     }
    //     else{
    //       localStorage.removeItem("uid")
    //       localStorage.removeItem("email")
    //       this.router.navigateByUrl("/auth")
    //     }
    //   }
    //   else{
    //     localStorage.removeItem("uid")
    //     localStorage.removeItem("email")
    //     this.router.navigateByUrl("/auth")
    //   }
    // })
   }


   signIn(email:any,password:any){
     this.common.showLoader()
     console.log(email,password)

     return this.afAuth.signInWithEmailAndPassword(email,password).then((res:any)=>{
      localStorage.setItem("uid",res.user.uid)
      localStorage.setItem("email",res.user.email)
      this.common.showToast("success","Successfull","You are LoggedIn successfully")
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
    if(localStorage.getItem("uid") == environment.adminUid){
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


}
