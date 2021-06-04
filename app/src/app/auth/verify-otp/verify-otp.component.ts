import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {
  formData: FormGroup;

  constructor(private fb: FormBuilder, public router: Router, public auth: AuthService,public common:CommonService) {
    this.formData = this.fb.group({
      'otp': ['', [Validators.required]],
    })
    if(!this.auth.mobile_no) {
      this.router.navigateByUrl("/auth")
    }
  }

  ngOnInit(): void {
  }

  get validation() { return this.formData?.controls; }

  onSubmit() {
    console.log(this.validation)
    console.log("otp data", this.formData.value)
    this.auth.verifyOtp(this.formData.value.otp)
  }

  resendOtp() {
    if(this.auth.mobile_no) {
      this.auth.sendOtp(this.auth.mobile_no).subscribe((res:any)=>{
        if (res.Status == "Success") {
          alert("Reset Successful!")
          this.auth.session_id = res.Details
          this.router.navigateByUrl('/auth/verify-otp')
        }
        else {
          alert("OTP not sent!")
          this.auth.session_id = null
          this.common.showToast("error", "", "Otp not sent!")
        }
      })
    }
    else
    {
      this.router.navigateByUrl("/auth")
      this.common.showToast("error", "", "Please Login again!")
    }
  }
}
