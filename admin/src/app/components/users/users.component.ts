import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  allData: any = []

  constructor(public user: UserService, public router: Router) { }

  ngOnInit(): void {
    this.getData()
  }

  sendNotification(id: any) {
    this.router.navigateByUrl("/notifications/add/" + id)
  }

  getData() {
    this.user.getAll().subscribe(res => {
      this.allData = res
      console.log("all users", this.allData)
    })
  }

}
