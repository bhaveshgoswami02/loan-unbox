import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  data: any = []

  constructor(public service: NotificationsService) { }

  ngOnInit(): void {
    // this.getsingleUserNotifications()
    if(this.service.allData[0]) {
      this.service.setLastNotification(this.service.allData[0])
      this.service.newNotifications = []
      console.log("this")
    }
  }

  // getsingleUserNotifications() {
  //   // this.service.getSingleUserNotifications().subscribe(res=>{
  //   //   this.data = res
  //   //   // this.getData()
  //   // })
  // }

  // getData() {
  //   this.service.getAll().subscribe(res => {
  //     this.data = this.data.concat(res)
  //     console.log("data", this.data)
  //   })
  // }


}
