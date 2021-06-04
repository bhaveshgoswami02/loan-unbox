import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formData: FormGroup;

  constructor(private fb: FormBuilder, public common: CommonService, public auth: AuthService,public router:Router) {
    this.formData = this.fb.group({
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'dob': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      'gender': ['', [Validators.required]],
      'password': ['', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]],
      'confirm_password': ['', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]],
      'address_details': this.fb.group({
        'flat_street': [''],
        'address': [''],
        'pincode': [''],
        'city': [''],
        'state': [''],
      })
    })
    if(!this.auth.mobile_no) {
      this.router.navigateByUrl("/auth")
    }
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
    this.formData.value.connector_code = this.common.generateConnectorCode()
    delete this.formData.value.confirm_password
    this.auth.registration(this.formData.value)
  }

}
