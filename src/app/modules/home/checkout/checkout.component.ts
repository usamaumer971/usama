import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  getcartDetail:any=[];
  total = 0;
  constructor() { }
  FirstName = new FormControl('');
  LastName = new FormControl('');
  PhoneNo = new FormControl('');
  Address = new FormControl('');
  Province = new FormControl('');
  City = new FormControl('');
  Payment = new FormControl('');
  ngOnInit() {
    this.loadCart();
    this.totalPrice();
  }
 
  loadCart(){
    if(localStorage.getItem('localCart')){
      this.getcartDetail=JSON.parse(localStorage.getItem('localCart'));
      console.log(this.getcartDetail);
    }
  }
  totalPrice(){
    // if(localStorage.getItem('localCart')){
    //   this.getcartDetail=JSON.parse (localStorage.getItem('localCart'));
    //   this.CartitemPrice=this.getcartDetail.reduce(function(acc,val){
    //     return acc+(val.price * val.quantity);
    //   },0);
    // }
    // let sum = this.getcartDetail.map(a => a.salesPrice).reduce((acc, cur) => acc + Number(cur), 0);
    let sum = 0;
    for(let i=0;i<this.getcartDetail.length;i++){
      
      sum= sum+ (this.getcartDetail[i].product.salesPrice * this.getcartDetail[i].productQuantity);
      
    }
    // console.log('Total sum of usama = ',sum);
    this.total=sum;
    console.log('!st Total on check out = ',this.total);
    localStorage.setItem('localCart',JSON.stringify(this.getcartDetail));
    // let sum = this.getcartDetail
    // this.CartitemPrice=sum;
    // console.log(sum);

  }
}
