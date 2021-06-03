import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {
  formData: FormGroup;

  constructor(private fb: FormBuilder, public router: Router, public auth: AuthService) {
    this.formData = this.fb.group({
      'otp': ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  get validation() { return this.formData?.controls; }

  onSubmit() {
    console.log(this.validation)
    console.log("otp data", this.formData.value)
    this.auth.verifyOtp(this.formData.value.otp)
  }

}
