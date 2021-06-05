import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { CommonService } from './common.service';
import firebase from 'firebase';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  mobile_no: any
  session_id: any = null

  constructor(public http: HttpClient, public db: AngularFirestore, public router: Router, public common: CommonService, public storage: StorageService) { }

  sendOtp(mobile_no: number) {
    let otp = this.common.generateOtp()
    let url = "https://2factor.in/API/V1/" + environment.otpApi + "/SMS/91" + mobile_no + "/" + otp + "/OTP-Partner"
    return this.http.get(url)
  }

  signin(mobile_no: number) {
    this.common.showLoader()
    this.mobile_no = mobile_no
    this.db.collection("users").doc(mobile_no.toString()).get().subscribe(res => {
      if (res.exists) {
        this.common.stopLoader()
        this.router.navigateByUrl("/auth/password")
      }
      else {
        this.sendOtp(this.mobile_no).subscribe((res: any) => {
          if (res.Status == "Success") {
            // alert("OTP sent!")
            this.common.showToast("success", "", "OTP Sent Successful on your mobile number!")
            this.session_id = res.Details
            this.common.stopLoader()
            this.router.navigateByUrl('/auth/verify-otp')
          }
          else {
            // alert("OTP not sent!")
            this.session_id = null
            this.common.showToast("error", "", res.Status)
          }
        }, error => {
          this.common.stopLoader()
          this.common.showToast("error", "", "Invalid Phone Number")
        })
      }
    })
  }

  verifyOtp(otp: any) {
    this.common.showLoader()
    let url = "https://2factor.in/API/V1/" + environment.otpApi + "/SMS/VERIFY/" + this.session_id + "/" + otp
    this.http.get(url).subscribe((res: any) => {
      if (res.Status == "Success") {
        this.common.stopLoader()
        this.common.showToast("success", "OTP verified successful!", "")
        this.router.navigateByUrl("/auth/register")
      }
      else {
        this.common.stopLoader()
        this.common.showToast("error", "OTP Not Match", "")
      }
    }, error => {
      this.common.stopLoader()
      this.common.showToast("error", "OTP Not Match", "")
    })
  }

  registration(data: any) {
    this.common.showLoader()
    data.mobile_no = this.mobile_no
    data.timestamp = firebase.firestore.Timestamp.now()
    this.db.collection("users").doc(this.mobile_no.toString()).set(data).then(res => {
      localStorage.setItem("uid", this.mobile_no.toString())
      this.setUser(data)
      this.router.navigateByUrl("/")
      this.common.stopLoader()
    })
  }

  onSubmitPassword(password: any) {
    this.common.showLoader()
    this.getUserDataFormDb(this.mobile_no).subscribe(res => {
      if (res.password === password) {
        localStorage.setItem("uid", this.mobile_no)
        this.setUser(res)
        this.common.stopLoader()
        this.router.navigateByUrl("/")
      }
      else {
        // alert("password not match")
        this.removeUserData()
        this.common.stopLoader()
        this.common.showToast("error", "Your Password is not match!", "")
      }
    })
  }

  setUser(data: any) {
    localStorage.setItem("userData", JSON.stringify(data))
  }

  getUserDetails() {
    return JSON.parse(localStorage.getItem('userData') || '{}');
  }

  getUserDataFormDb(id: any) {
    console.log("id", id)
    return this.db.collection("users").doc(id.toString()).get().pipe(
      map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      })
    )
  }

  updateUser(uid: any, data: any) {
    this.common.showLoader()
    return this.db.collection("users").doc(uid).update(data).then(res => {
      this.setUser(data)
      this.common.showToast("success", "User Updated Successful!", "")
    }).catch(err => {
      this.common.showToast("error", "Error", err)
    }).finally(() => {
      this.common.stopLoader()
    })
  }

  resetPasswword(uid: any, data: any) {
    this.common.showLoader()
    return this.db.collection("users").doc(uid).update(data).then(res => {
      this.common.showToast("success", "Password Updated Successful!", "Please Login Again!")
      this.logout()
    }).catch(err => {
      this.common.showToast("error", "Error", err)
    }).finally(() => {
      this.common.stopLoader()
    })
  }

  getUid() {
    return localStorage.getItem("uid")
  }

  removeUserData() {
    localStorage.removeItem("uid")
    localStorage.removeItem("userData")
  }

  logout() {
    this.removeUserData()
    this.router.navigateByUrl("/auth")
  }

  profileUpdate(id: any, data: any, img?: any) {
    this.common.showLoader()
    let path = "users" + "/" + id + "/" + "users";
    if (img) {
      return this.storage.upload(path, img).then((newUrl: any) => {
        this.profileUpdate(id, { imgUrl: newUrl, ...data });
      }).catch((err: any) => {
        this.common.showToast("error", "Error", err)
      }).finally(() => {
        this.common.stopLoader()
        // this.router.navigateByUrl("/"+"users")
      })
    } else {
      return this.db.collection("users").doc(id).update(data).then(res => {
        // this.router.navigateByUrl("/"+"users")
        this.getUserDataFormDb(this.getUid()).subscribe(res=>{
          this.setUser(res)
        })
        this.common.showToast("success", "Successful", "User Updated!")
      }).catch(err => {
        this.common.showToast("error", "Error", err)
        return err;
      }).finally(() => {
        this.common.stopLoader()
      })
    }
  }

}