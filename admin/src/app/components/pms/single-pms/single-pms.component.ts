import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { PmsService } from 'src/app/services/pms.service';

@Component({
  selector: 'app-single-pms',
  templateUrl: './single-pms.component.html',
  styleUrls: ['./single-pms.component.scss']
})
export class SinglePmsComponent implements OnInit {
  id:any
  userId:any
  data: any
  isSingleUserUpdate:boolean = false

  formData=this.fb.group({
    name:[''],
    password:[''],
    email:['']
  })

  constructor(public route: ActivatedRoute, public fb:FormBuilder,public dataService: PmsService, public router: Router,public common:CommonService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id")
    if (this.id) {
      this.dataService.getSinglePms(this.id).subscribe((res:any) => {
        this.data = res
        this.formData.patchValue(res)
      })
    }
  }

 async onSubmit() {
    console.log(this.formData.value)
    try {
      const data =this.formData.value
    const res = await this.dataService.add(data)
    console.log(res)
    }

    catch (err)
    {
      console.log(err)
    }
  }

}
