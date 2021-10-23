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
  allStates: any = []

  constructor(private fb: FormBuilder, public common: CommonService, public auth: AuthService,public router:Router) {
    this.allStates = [
      { name: "Andaman and Nicobar Islands" },
      { name: "Andhra Pradesh" },
      { name: "Arunachal Pradesh" },
      { name: "Assam" },
      { name: "Bihar" },
      { name: "Chandigarh" },
      { name: "Chhattisgarh" },
      { name: "Dadra and Nagar Haveli" },
      { name: "Daman and Diu" },
      { name: "Delhi" },
      { name: "Goa" },
      { name: "Gujarat" },
      { name: "Haryana" },
      { name: "Himachal Pradesh" },
      { name: "Jammu and Kashmir" },
      { name: "Jharkhand" },
      { name: "Karnataka" },
      { name: "Kerala" },
      { name: "Lakshadweep" },
      { name: "Madhya Pradesh" },
      { name: "Maharashtra" },
      { name: "Manipur" },
      { name: "Meghalaya" },
      { name: "Mizoram" },
      { name: "Nagaland" },
      { name: "Odisha" },
      { name: "Puducherry" },
      { name: "Punjab" },
      { name: "Rajasthan" },
      { name: "Sikkim" },
      { name: "Tamil Nadu" },
      { name: "Telangana" },
      { name: "Tripura" },
      { name: "Uttar Pradesh" },
      { name: "Uttarakhand" },
      { name: "West Bengal" }
    ]
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
