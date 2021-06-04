import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  formData: FormGroup;
  id:any = null
  constructor(private fb: FormBuilder, public common: CommonService, public auth: AuthService,public route:ActivatedRoute) {
    this.formData = this.fb.group({
      'password': ['', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]],
      'confirm_password': ['', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]]
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id")
  }

  get validation() { return this.formData?.controls; }

  comparePassword() {
    if (this.formData.value.confirm_password == this.formData.value.password) {
      return true
    }
    else {
      return false
    }
  }

  onSubmit() {
    delete this.formData.value.confirm_password
    this.auth.resetPasswword(this.id,this.formData.value)
  }

  back() {
    this.common.back()
  }
}
