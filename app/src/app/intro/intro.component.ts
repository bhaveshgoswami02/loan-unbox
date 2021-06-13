import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Swiper
} from 'swiper/core';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  
  swiper:Swiper=new Swiper('.bhjb')
  constructor(public router:Router) { }

  ngOnInit(): void {
   
  }

  onSwiper(swiper:Swiper) {
    this.swiper=swiper
    //console.log(swiper.slideNext());
  }
  onSlideChange() {
    console.log('slide change');
  }

  next(){
    if(this.swiper.activeIndex==2){
      this.router.navigateByUrl("/auth")
    }
    this.swiper.slideNext()
  }

}
