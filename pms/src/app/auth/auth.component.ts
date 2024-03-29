import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(public auth:AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(data:NgForm){
    console.log(data.value)
    this.auth.signIn(data.value.email,data.value.password)
    data.resetForm();
  }

}
