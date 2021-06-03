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
      'name': ['', [Validators.required]],
      'gender': ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.getData()
  }
  
  get validation() { return this.formData?.controls; }

  getData() {
    this.auth.getUserDataFormDb(this.auth.getUid()).subscribe(res=>{
      this.auth.setUser(res)
      this.formData =  this.fb.group({
        'name': [res.name, [Validators.required]],
        'gender': [res.gender, [Validators.required]],
      }) 
    })
  }

  onSubmit() {
    this.auth.updateUser(this.formData.value)
  }

}
