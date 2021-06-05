import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';

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

}
