import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { PmsService } from 'src/app/services/pms.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  allData: any = [];
  allPms: any = [];
  viewData:any=null
  displayBasic=false
  cols = [
    { field: 'firstName', header: 'Name' },
    { field: 'connector_code', header: 'Partner Code' },
    { field: 'mobile_no', header: 'Mobile' },
    { field: 'timestamp', header: 'Date' },
    { field: 'notification', header: 'Notification' },
    { field: 'info', header: 'View Info' },
    { field: 'comment', header: 'Comment' },
    { field: 'assignedPmsId', header: 'Assigned PMS' },
    { field: 'block', header: 'Block/Unblock' },
  ];

  informations = [
    { field: 'firstName', header: 'Name' },
    { field: 'connector_code', header: 'Partner Code' },
    { field: 'mobile_no', header: 'Mobile' },
    { field: 'gender', header: 'Gender' },
    { field: 'timestamp', header: 'Date' },
    { field: 'address_details', header: 'Address' }
  ];


  loading: boolean = true;
  allStates: any = [];
  state: any = { name: 'All' };
  pmsId = new FormControl();
  constructor(
    public user: UserService,
    public pmsService: PmsService,
    public router: Router,
    public common: CommonService
  ) {}

  ngOnInit(): void {
    this.allStates = [
      { name: 'All' },
      { name: 'Andaman and Nicobar Islands' },
      { name: 'Andhra Pradesh' },
      { name: 'Arunachal Pradesh' },
      { name: 'Assam' },
      { name: 'Bihar' },
      { name: 'Chandigarh' },
      { name: 'Chhattisgarh' },
      { name: 'Dadra and Nagar Haveli' },
      { name: 'Daman and Diu' },
      { name: 'Delhi' },
      { name: 'Goa' },
      { name: 'Gujarat' },
      { name: 'Haryana' },
      { name: 'Himachal Pradesh' },
      { name: 'Jammu and Kashmir' },
      { name: 'Jharkhand' },
      { name: 'Karnataka' },
      { name: 'Kerala' },
      { name: 'Lakshadweep' },
      { name: 'Madhya Pradesh' },
      { name: 'Maharashtra' },
      { name: 'Manipur' },
      { name: 'Meghalaya' },
      { name: 'Mizoram' },
      { name: 'Nagaland' },
      { name: 'Odisha' },
      { name: 'Puducherry' },
      { name: 'Punjab' },
      { name: 'Rajasthan' },
      { name: 'Sikkim' },
      { name: 'Tamil Nadu' },
      { name: 'Telangana' },
      { name: 'Tripura' },
      { name: 'Uttar Pradesh' },
      { name: 'Uttarakhand' },
      { name: 'West Bengal' },
    ];
    this.getData();
    this.getAllPmsData();
  }

  sendNotification(id: any) {
    this.router.navigateByUrl('/notifications/add/' + id);
  }

  getData() {
    this.user.getAll(this.state.name).subscribe((res) => {
      this.allData = res;
      this.loading = false;
      console.log('all users', this.allData);
    });
  }

  getAllPmsData() {
    this.pmsService.getAll().subscribe((res) => {
      this.allPms = res;
      console.log('all Pms users', this.allData);
    });
  }

  onStateChange() {
    this.getData();
  }

  assignPMS(event: any, userId: any) {
    let obj = { assignedPmsId: event.target.value };
    console.log(obj, userId);
    this.user.update(userId, obj).then((res) => {
      console.log(res);
    });
  }

  viewInfo (data:any) {
    this.viewData=data
    this.displayBasic=true

  }

  saveComment(userid:any,comments:any) {
    let obj= {comment:comments}
    console.log(obj)
    this.user.update(userid,obj).then(res=>{
      console.log(res)
    })
  }

  blockPMS(userid:any) {
    let obj= {isBlocked:true}
    console.log(obj)
    this.user.update(userid,obj).then(res=>{
      console.log(res)
    })
  }

  unblockPMS(userid:any) {
    let obj= {isBlocked:false}
    console.log(obj)
    this.user.update(userid,obj).then(res=>{
      console.log(res)
    })
  }


}
