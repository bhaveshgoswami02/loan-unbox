import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private toastr: ToastrService,private loader: NgxUiLoaderService,private http : HttpClient) { }

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
  showLoader(){
    this.loader.start();
  }
  stopLoader(){
    this.loader.stop()
  }
  sendNotification(token:any, notification:any){
    const httpOptions = {
       headers : new HttpHeaders({
        'Authorization': 'key=AAAAWnwZd-0:APA91bFXoHsnl9zIXnvvHEfsSoyxXgpeiyUBq5okoR4ojYFZ1QB6VDYE7E7SdnRTyfxvMk4mBoeiSApJVBE5Xux0T9c8biQh7CXN0ZRUFHgqW0P6c-Ekeg4rZnnMFDXsbEUlDgtsNiiC',
        'Content-Type':'application/json'
      })
    };
    return this.http.post('https://fcm.googleapis.com/fcm/send',JSON.stringify({
      "notification": {
        "title": notification.title,
        "body": notification.body,
        //"icon" : notification.icon?.url,
        //"image" : notification.image?.url,
      },
      "data" : notification.customData,
      "apns":{
        "fcm_option":{
          //"image":notification.image?.url,
        }
      },
      "android": {
        //"image": notification.image?.url,
      },
      // "click_action" : "https://google.com",
      "to" : token
    }), httpOptions).toPromise()
  }




  back() {
    window.history.back()
  }

}
