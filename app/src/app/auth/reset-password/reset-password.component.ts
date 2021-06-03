import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  formData: FormGroup;

  constructor(private fb: FormBuilder, public common: CommonService, public auth: AuthService) {
    this.formData = this.fb.group({
      'password': ['', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]],
      'confirm_password': ['', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]]
    })
  }

  ngOnInit(): void {
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
    this.auth.updateUser(this.formData.value)
  }

}
