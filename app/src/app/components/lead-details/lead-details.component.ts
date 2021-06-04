import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.scss']
})
export class LeadDetailsComponent implements OnInit {
  id:any = null
  data:any
  constructor(public route:ActivatedRoute,public service:LeadService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id")
    if(this.id) {
      this.getData()
    }
  }

  getData() {
    this.service.getSingle(this.id).subscribe(res=>{
      this.data = res
      console.log("data",this.data)
    })
  }

}
