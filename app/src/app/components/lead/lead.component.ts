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

  constructor(private fb: FormBuilder, public service: LeadService, public auth: AuthService) {
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
