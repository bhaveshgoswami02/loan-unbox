import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formData: FormGroup;

  constructor(private fb: FormBuilder, public common: CommonService, public auth: AuthService) {
    this.formData = this.fb.group({
      'name': ['', [Validators.required]],
      'gender': ['', [Validators.required]],
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
    // here we have to take connector code defalut generate  
    this.formData.value.connector_code = this.common.generateConnectorCode()
    delete this.formData.value.confirm_password
    console.log("registration data", this.formData.value)
    this.auth.registration(this.formData.value)
  }

}
