import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {
  allData: any = []

  constructor(public service: LeadService, public router: Router) {
  }
  
  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.service.getAll().subscribe(res => {
      this.allData = res
      console.log("all leads", this.allData)
    })
  }

  onStatusChange(id:any,event:any) {
    console.log("status",event.target.value)
    let data = {status:event.target.value}
    this.service.update(id,data)
  }

  delete(id:any) {
    this.service.delete(id)
  }
}
