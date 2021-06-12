import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { environment } from 'src/environments/environment';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('toggler') toggler:ElementRef | undefined

  constructor(public auth:AuthService,public notificationService:NotificationsService) { }

  ngOnInit(): void {
    this.notificationService.getSingleUserNotifications()
  }

  toggle(){
    if(this.toggler){
      this.toggler.nativeElement.click()
    }
  }

  logout() {
    this.auth.logout()
    this.toggle()
  }

  async share(){
    if (navigator.share) {
      navigator.share(environment.shareLink)
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }else{
      await Share.share(environment.shareLink);
    }
  }

}
