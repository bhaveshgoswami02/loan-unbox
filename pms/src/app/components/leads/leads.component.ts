import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadsService } from 'src/app/services/leads.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss'],
})
export class LeadsComponent implements OnInit {
  allData: any = [];
  cols = [
    { field: 'connector_code', header: 'Partner Code' },
    { field: 'connectorDetails', header: 'Partner Name' },
    { field: 'prefix', header: 'Name' },
    { field: 'mobile_no', header: 'Mobile' },
    { field: 'amount', header: 'Amount' },
    { field: 'loan_required', header: 'Loan Required' },
    { field: 'description', header: 'Description' },
    { field: 'timestamp', header: 'Date' },
    { field: 'status', header: 'Status' },
    { field: 'comment', header: 'Comment' },
    { field: 'info', header: 'Info' },
  ];

  informations = [
    { field: 'connector_code', header: 'Partner Code' },
    { field: 'connectorDetails', header: 'Partner Name' },
    { field: 'prefix', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'mobile_no', header: 'Mobile' },
    { field: 'amount', header: 'Amount' },
    { field: 'loan_required', header: 'Loan Required' },
    { field: 'description', header: 'Description' },
    { field: 'address_details', header: 'Address' }
  ];

  loading: boolean = true;
  allStates: any = [];
  state: any = { name: 'All' };
  displayBasic:any=false
  viewData:any=null
  connector_code:any

  constructor(public service: LeadsService, public router: Router,public route:ActivatedRoute,public common:CommonService) {}

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
    this.connector_code = this.route.snapshot.params['user_code']
    if(this.connector_code) {
      this.getData();
    }
  }



  onStatusChange(id: any, event: any) {
    let data = { status: event.target.value };
    this.service.update(id, data).then((res) => {});
  }

  getData() {
    if(this.state.name=='All') {
      this.service.getAllByUserCode(this.connector_code).subscribe((res) => {
        this.allData = res;
        this.loading = false;
        console.log('all leads', this.allData);
      });
    }
    else {
      this.service.getAllByUserCodeandState(this.state.name,this.connector_code).subscribe((res) => {
        this.allData = res;
        this.loading = false;
        console.log('all leads', this.allData);
      });
    }

  }



  onStateChange() {
    this.getData();
  }

  saveComment(userid:any,comments:any) {
    let obj= {comment:comments}
    this.service.update(userid,obj).then(res=>{
      console.log(res)
    })
  }


  viewInfo (data:any) {
    this.viewData=data
    this.displayBasic=true
  }



}
