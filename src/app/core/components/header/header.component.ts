import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../shared/services/category/category.service';
import {CartNumService} from 'src/app/cart-num.service';
import { HostListener } from '@angular/core';

@Component({ 
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  account = sessionStorage.getItem('c_name');
  categories = [];
  scrolled = 0;

  constructor(
    private categoryService: CategoryService,
    private cartnumService:CartNumService
  ) {
    this.getCategories();
    this.cartnumService.cartSubject.subscribe((data)=>{
      this.cartItem=data;
    })
    
    this.cartnumService.cartSubject.next(this.cartItem);
  }

  ngOnInit() {
    this.cartitemFunc();
  }
  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    const numb = window.scrollY;
    if (numb >= 600){
      this.scrolled = 1;
    }
    else {
      this.scrolled = 0;
    }
  }

  cartItem:any= 0;
  cartitemFunc(){
    if(localStorage.getItem('localCart')!=null){
      var count=JSON.parse(localStorage.getItem('localCart'));
      //  console.log(count);
       this.cartItem=count.length;

    }

  }

  logout() {
    sessionStorage.removeItem('c_jwt');
    sessionStorage.removeItem('c_role');
    sessionStorage.removeItem('c_name');
    sessionStorage.removeItem('jwt');
    window.location.reload();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((serverResponse) => {
      if (serverResponse) {
        if (serverResponse.response) {
          this.categories = serverResponse.data.categories;
          //console.log(serverResponse.data.subCategories);
        } else {
          console.log(serverResponse.error);
        }
      } else {
        console.log("error");
      }
    });
  }
}
