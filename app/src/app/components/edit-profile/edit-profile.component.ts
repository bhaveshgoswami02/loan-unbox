import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  formData: FormGroup;

  constructor(private fb: FormBuilder, public auth: AuthService) {
    this.formData = this.fb.group({
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'dob': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      'gender': ['', [Validators.required]],
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
    this.getData()
  }

  get validation() { return this.formData?.controls; }

  getData() {
    this.auth.getUserDataFormDb(this.auth.getUid()).subscribe(res => {
      this.auth.setUser(res)
      this.formData = this.fb.group({
        'firstName': [res?.firstName, [Validators.required]],
        'lastName': [res?.lastName, [Validators.required]],
        'dob': [res?.dob, [Validators.required]],
        'email': [res?.email, [Validators.required]],
        'gender': [res?.gender, [Validators.required]],
        'address_details': this.fb.group({
          'flat_street': [res?.address_details?.flat_street],
          'address': [res?.address_details?.address],
          'pincode': [res?.address_details?.pincode],
          'city': [res?.address_details?.city],
          'state': [res?.address_details?.state],
        })
      })
    })
  }

  onSubmit() {
    this.auth.updateUser(this.auth.getUid(), this.formData.value)
  }

}
