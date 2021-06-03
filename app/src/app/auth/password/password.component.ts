import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  formData: FormGroup;

  constructor(private fb: FormBuilder, public router: Router, public auth: AuthService) {
    this.formData = this.fb.group({
      'password': ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  get validation() { return this.formData?.controls; }

  onSubmit() {
    this.auth.onSubmitPassword(this.formData.value.password)
  }

}
