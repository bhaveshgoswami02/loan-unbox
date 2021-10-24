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
  cols = [
    { field: 'firstName', header: 'Name' },
    { field: 'connector_code', header: 'Partner Code' },
    { field: 'mobile_no', header: 'Mobile' },
    { field: 'gender', header: 'Gender' },
    { field: 'timestamp', header: 'Date' },
    { field: 'address_details', header: 'Address' },
    { field: 'notification', header: 'Notification' },
  ];
  loading:boolean = true;
  allStates: any = []
  state: any = {name:"All"}

  constructor(public user: UserService, public router: Router) { }

  ngOnInit(): void {
    this.allStates = [
      {name:"All"},
      {name:"Andaman and Nicobar Islands"},
      {name:"Andhra Pradesh"},
      {name:"Arunachal Pradesh"},
      {name:"Assam"},
      {name:"Bihar"},
      {name:"Chandigarh"},
      {name:"Chhattisgarh"},
      {name:"Dadra and Nagar Haveli"},
      {name:"Daman and Diu"},
      {name:"Delhi"},
      {name:"Goa"},
      {name:"Gujarat"},
      {name:"Haryana"},
      {name:"Himachal Pradesh"},
      {name:"Jammu and Kashmir"},
      {name:"Jharkhand"},
      {name:"Karnataka"},
      {name:"Kerala"},
      {name:"Lakshadweep"},
      {name:"Madhya Pradesh"},
      {name:"Maharashtra"},
      {name:"Manipur"},
      {name:"Meghalaya"},
      {name:"Mizoram"},
      {name:"Nagaland"},
      {name:"Odisha"},
      {name:"Puducherry"},
      {name:"Punjab"},
      {name:"Rajasthan"},
      {name:"Sikkim"},
      {name:"Tamil Nadu"},
      {name:"Telangana"},
      {name:"Tripura"},
      {name:"Uttar Pradesh"},
      {name:"Uttarakhand"},
      {name:"West Bengal"}
    ]
    this.getData()
  }

  sendNotification(id: any) {
    this.router.navigateByUrl("/notifications/add/" + id)
  }

  getData() {
    this.user.getAll(this.state.name).subscribe(res => {
      this.allData = res
      this.loading = false
      console.log("all users", this.allData)
    })
  }

  onStateChange() {
    this.getData()
  }

}
