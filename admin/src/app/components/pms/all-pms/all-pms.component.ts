import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PmsService } from 'src/app/services/pms.service';

@Component({
  selector: 'app-all-pms',
  templateUrl: './all-pms.component.html',
  styleUrls: ['./all-pms.component.scss']
})
export class AllPmsComponent implements OnInit {
  allData:any = []

  constructor(public dataService: PmsService, public router: Router) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.dataService.getAll().subscribe(res => {
      this.allData = res
      console.log("all data",this.allData)

    })
  }


  add() {
    this.router.navigateByUrl("/" + this.dataService.collection + "/add")
  }

  edit(id:any) {
    this.router.navigateByUrl("/" + this.dataService.collection + "/edit/" + id)
  }

}
