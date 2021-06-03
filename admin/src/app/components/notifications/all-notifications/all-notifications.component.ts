import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-all-notifications',
  templateUrl: './all-notifications.component.html',
  styleUrls: ['./all-notifications.component.scss']
})
export class AllNotificationsComponent implements OnInit {
  allData:any = []

  constructor(public dataService: NotificationsService, public router: Router) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.dataService.getAll().subscribe(res => {
      this.allData = res
      console.log("all data",this.allData)
      this.getSingleUserNotifications()
    })
  }
  
  getSingleUserNotifications() {
    this.dataService.getAllSingleUserNotifications().subscribe(res=>{
      this.allData = this.allData.concat(res)
      console.log("all data",this.allData)
    })
  }

  delete(id:any,uid?:any) {
    if(!uid) {
      this.dataService.delete(id)
    }
    else
    {
      this.dataService.deleteNotificationToSingleUser(id)
    }
  }

  add() {
    this.router.navigateByUrl("/" + this.dataService.collection + "/add")
  }

  edit(id:any) {
    this.router.navigateByUrl("/" + this.dataService.collection + "/edit/" + id)
  }

}
