import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  formData: FormGroup;
  otpForm: FormGroup;
  isOtpSent: boolean = false
  session_id:any

  constructor(private fb: FormBuilder, public authService: AuthService,public http:HttpClient,public router:Router,public common:CommonService) {
    this.formData = this.fb.group({
      'mobile_no': ['', [Validators.required]],
    })
    this.otpForm = this.fb.group({
      'otp': ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  get validation() { return this.formData?.controls; }
  get validation2() { return this.formData?.controls; }

  onSubmit() {
    this.authService.db.collection("users").doc(this.formData.value.mobile_no.toString()).get().subscribe(res => {
      if (res.exists) {
        this.authService.sendOtp(this.formData.value.mobile_no).subscribe((res:any)=>{
          if (res.Status == "Success") {
            alert("OTP sent!")
            this.session_id = res.Details
            this.isOtpSent = true
          }
          else {
            alert("OTP not sent!")
            this.session_id = null
            this.isOtpSent = false
          }
        })
      }
      else {
       alert("user not exist!")
      }
    })
  }

  vertifyOtp() {
    let url = "https://2factor.in/API/V1/" + environment.otpApi + "/SMS/VERIFY/" + this.session_id + "/" + this.otpForm.value.otp
    this.http.get(url).subscribe((res: any) => {
      if (res.Status == "Success") {
        alert("otp verify")
        this.router.navigateByUrl("/auth/reset-password")
      }
      else {
        alert("otp not verify")
        this.common.showToast("error", "OTP Not Match", "")
      }
    })
  }

}
