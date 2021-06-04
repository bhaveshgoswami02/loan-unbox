import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allLeads:any = []
  approvedLeads:any = []
  progressLeads:any = []
  rejectedLeads:any = []
  constructor(public router:Router,public auth:AuthService,public leadService:LeadService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.leadService.getAll().subscribe(res=>{
      this.allLeads = res
      console.log("all leads",this.allLeads)
      this.allLeads.forEach((lead:any) => {
        if (lead == 'progress' || lead == 'pending') {
          this.progressLeads.push(lead)
        } else if (lead == 'approved') {
          this.approvedLeads.push(lead)
        } else if (lead == 'rejected') {
          this.rejectedLeads.push(lead)
        } 
      });
    })
  }

  logout() {
    this.auth.logout()
  }
  
}
