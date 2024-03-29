import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CommonService } from './services/common.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Location, PopStateEvent } from "@angular/common";
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private lastPoppedUrl: any;
  private yScrollStack: any[] = [];
  backbuttonPressedOnce=false

  constructor(public authService: AuthService, public common: CommonService,private router: Router, private location: Location) { }

  ngOnInit() {
    App.addListener('backButton', () => {
        if(window.location.pathname!="/"){
            window.history.back();
        }else{
            if(this.backbuttonPressedOnce){
                App.exitApp()
            }
            this.backbuttonPressedOnce=true
            setTimeout(() => {
                this.backbuttonPressedOnce=false
            }, 1500);
        }
      });
    this.location.subscribe((ev:PopStateEvent) => {
        this.lastPoppedUrl = ev.url;
    });
    if(!localStorage.getItem("uid")){
        console.log(window.location.pathname)
        if(window.location.pathname=="/"){
            setTimeout(() => {
                //this.router.navigateByUrl("/intro")
            }, 200);
        }
    }
    this.router.events.subscribe((ev:any) => {
        if (ev instanceof NavigationStart) {
            if (ev.url != this.lastPoppedUrl)
                this.yScrollStack.push(window.scrollY);
        } else if (ev instanceof NavigationEnd) {
            if (ev.url == this.lastPoppedUrl) {
                this.lastPoppedUrl = undefined;
                window.scrollTo(0, this.yScrollStack.pop());
            } else
                window.scrollTo(0, 0);
        }
    });
}
}
