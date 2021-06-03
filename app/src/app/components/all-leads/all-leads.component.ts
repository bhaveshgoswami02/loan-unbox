import { Component, OnInit } from '@angular/core';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-all-leads',
  templateUrl: './all-leads.component.html',
  styleUrls: ['./all-leads.component.scss']
})
export class AllLeadsComponent implements OnInit {
  data:any = []
  constructor(public service:LeadService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.service.getAll().subscribe(res=>{
      this.data = res
      console.log("data",this.data)
    })
  }

}
