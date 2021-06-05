import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
// import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  loader:boolean = false

  constructor(public location: Location,private toastr: ToastrService) { }

  showToast(type:string,title:string,message:string) {
    if(type=="success"){
      this.toastr.success(title,message)
    }
    if(type=="error"){
      this.toastr.error(title,message)
    }
    if(type=="info"){
      this.toastr.info(title,message)
    }
    if(type=="warning"){
      this.toastr.warning(title,message)
    }
  }

  showLoader() {
    this.loader = true
  }

  stopLoader() {
    this.loader = false
  }

  back() {
    this.location.back()
  }

  generateConnectorCode() {
    var code = "";
    var possible2 = "0123456789";
    for (var i = 0; i < 9; i++)
      code += possible2.charAt(Math.floor(Math.random() * possible2.length));
    return code;
  }

  generateOtp() {
    var otp = "";
    var possible2 = "0123456789";
    for (var i = 0; i < 6; i++)
      otp += possible2.charAt(Math.floor(Math.random() * possible2.length));
    return otp;
  }

}
