import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  formData: FormGroup;

  constructor(private fb: FormBuilder, public router: Router, public auth: AuthService) {
    this.formData = this.fb.group({
      'mobile_no': ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  get validation() { return this.formData?.controls; }

  onSubmit() {
    console.log(this.validation)
    this.auth.signin(this.formData.value.mobile_no)
  }

}
