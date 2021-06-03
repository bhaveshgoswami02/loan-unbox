import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-single-notification',
  templateUrl: './single-notification.component.html',
  styleUrls: ['./single-notification.component.scss']
})
export class SingleNotificationComponent implements OnInit {
  id:any
  userId:any
  data: any
  isSingleUserUpdate:boolean = false
  constructor(public route: ActivatedRoute, public dataService: NotificationsService, public router: Router,public common:CommonService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id")
    this.userId = this.route.snapshot.paramMap.get("userId")
    if (this.id) {
      this.dataService.getSingle(this.id).subscribe((res:any) => {
        this.data = res
        if(!this.data.title) {
          this.dataService.getNotificationToSingleUser(this.id).subscribe(res=>{
            this.data = res
            if(this.data.uid) {
              this.isSingleUserUpdate = true
            }
          })
        }
      })
    }
  }

  onSubmit(data: NgForm) {
    delete data.value.file
    if (this.id) {
      if(this.isSingleUserUpdate) {
        this.dataService.updateNotificationToSingleUser(this.id, data.value)
        data.resetForm()
        this.id = null
        this.data = null
        this.isSingleUserUpdate = false
      }
      else
      {
        this.dataService.update(this.id, data.value)
        data.resetForm()
        this.data = null
      }
    }
    else {
      if(this.userId) {
        data.value.uid = this.userId
        this.dataService.sendNotificationToSingleUser(data.value)
        data.resetForm()
        this.data = null
        this.userId = null
      }
      else
      {
        this.dataService.add(data.value)
        data.resetForm()
        this.data = null
      }
    }
  }

}
