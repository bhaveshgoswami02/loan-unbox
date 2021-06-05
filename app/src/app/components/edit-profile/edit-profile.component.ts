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
  imageSrc: any = "../../../assets/images/user.png";
  imageFile: any;
  connector_code:any
  constructor(private fb: FormBuilder, public auth: AuthService) {
    this.formData = this.fb.group({
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'dob': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      'gender': ['', [Validators.required]],
      'file': [''],
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
        'file': [''],
        'address_details': this.fb.group({
          'flat_street': [res?.address_details?.flat_street],
          'address': [res?.address_details?.address],
          'pincode': [res?.address_details?.pincode],
          'city': [res?.address_details?.city],
          'state': [res?.address_details?.state],
        })
      })
      if(res?.imgUrl) {
        this.imageSrc = res?.imgUrl
      }
      this.connector_code = res?.connector_code
    })
  }

  onSelectFile(event: any) {
    const reader = new FileReader();
    if (event.target.files) {
      const [file] = event.target.files;
      this.imageFile = event.target.files[0];
      console.log("imageFile", this.imageFile)
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        console.log(this.imageSrc)
      };
    }
  }

  onSubmit() {
    delete this.formData.value.file
    this.auth.profileUpdate(this.auth.getUid(), this.formData.value, this.imageFile)
  }

}
