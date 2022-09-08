import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { UsersService } from 'src/app/services/users.service';

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
    { field: 'connector_code', header: 'Connector Code' },
    { field: 'mobile_no', header: 'Mobile' },
    { field: 'gender', header: 'Gender' },
    { field: 'timestamp', header: 'Date' },
    { field: 'comment', header: 'Comment' },
    { field: 'action', header: 'Action' },
  ];

  informations = [
    { field: 'firstName', header: 'Name' },
    { field: 'connector_code', header: 'Connector Code' },
    { field: 'mobile_no', header: 'Mobile' },
    { field: 'gender', header: 'Gender' },
    { field: 'timestamp', header: 'Date' },
    { field: 'address_details', header: 'Address' },
    { field: 'comment', header: 'Comment' }
  ];

  loading: boolean = true;
  allStates: any = [];
  state: any = { name: 'All' };
  pmsId = new FormControl();
  constructor(
    public user: UsersService,
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

  }


  getData() {
    this.user.getAllByPMSId().subscribe((res) => {
      this.allData = res;
      this.loading = false;
      console.log('all users', this.allData);
    });
  }



  onStateChange() {
    this.getData();
  }


  viewLeads(code:any) {
    this.router.navigateByUrl('/leads/' + code )
  }


  saveComment(userid:any,comments:any) {
    let obj= {comment:comments}
    console.log(obj)
    this.user.update(userid,obj).then(res=>{
      console.log(res)
    })
  }

  viewInfo (data:any) {
    this.viewData=data
    this.displayBasic=true

  }


}
