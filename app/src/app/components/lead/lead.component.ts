import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss']
})
export class LeadComponent implements OnInit {
  formData: FormGroup;
  allStates: any = []

  constructor(private fb: FormBuilder, public service: LeadService, public auth: AuthService) {
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
      'prefix': ['mr.', [Validators.required]],
      'firstName': ['', [Validators.required]],
      'middleName': [''],
      'lastName': ['', [Validators.required]],
      'email': [''],
      'mobile_no': ['', [Validators.required]],
      'loan_required': ['', [Validators.required]],
      'description': [''],
      'amount': [0, [Validators.required]],
      'address_details': this.fb.group({
        'flat_street': [''],
        'address': [''],
        'pincode': [''],
        'city': [''],
        'state': [''],
      })
    })
  }

  ngOnInit(): void {
  }

  get validation() { return this.formData?.controls; }

  onSubmit() {
    this.formData.value.status = "pending"
    this.formData.value.connector_code = this.auth.getUserDetails().connector_code
    this.formData.value.connectorDetails = this.auth.getUserDetails()
    this.service.add(this.formData.value)
  }

}
