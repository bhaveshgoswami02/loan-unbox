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
  connector_code: any
  allStates: any = []

  constructor(private fb: FormBuilder, public auth: AuthService) {
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
      if (res?.imgUrl) {
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
