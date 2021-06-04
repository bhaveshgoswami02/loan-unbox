import { Component, OnInit } from '@angular/core';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-all-leads',
  templateUrl: './all-leads.component.html',
  styleUrls: ['./all-leads.component.scss']
})
export class AllLeadsComponent implements OnInit {
  allData:any = []
  constructor(public service:LeadService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.service.getAll().subscribe(res=>{
      this.allData = res
      console.log("allData",this.allData)
    })
  }

}
