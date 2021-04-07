import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../../shared/services/client/client.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  quantity: any;
  cart: any;
  total = 0;
  server = environment.apiServer;

  constructor( private userService: ClientService) { }
  getcartDetail:any=[];
  ngOnInit() {
    this.getCart();
    this.loadCart();this.totalPrice();
    console.log(this.getcartDetail);
    console.log('Total sum of usama = ',this.total);
  }


 
  plus(id,productQuantity){  
    for(let i=0;i<this.getcartDetail.length;i++){
      if(this.getcartDetail[i].product._id===id){
        if(productQuantity !=5 ){
        this.getcartDetail[i].productQuantity=parseInt( productQuantity)+1;
       
      }
    }
     localStorage.setItem('localCart',JSON.stringify(this.getcartDetail));
     this.totalPrice();
    
    }
    
    // if(product.quantity !=5){
    //   console.log(product.quantity);
    //   product.quantity +=1;
    // }  
    // if(this.i !=5 ){
    //   this.i++;
    //   this.Quantity=this.i;
    // }
  }
  minus(id,productQuantity){
    for(let i=0;i<this.getcartDetail.length;i++){
      if(this.getcartDetail[i].product._id===id){
        if(productQuantity != 1 ){
        this.getcartDetail[i].productQuantity=parseInt(productQuantity)-1;
      }
    }
   localStorage.setItem('localCart',JSON.stringify(this.getcartDetail));
   this.totalPrice();
    }

    // if(product.quantity !=1){
    //   console.log(product.quantity);
    //   product.quantity -=1;
    // }
    // if(this.i !=1 ){
    //   this.i--;
    //   this.Quantity=this.i;
    // }
  }
  loadCart(){
    if(localStorage.getItem('localCart')){
      this.getcartDetail=JSON.parse(localStorage.getItem('localCart'));
      console.log(this.getcartDetail);
    }
  }
  getCart() {
    this.userService.getCartProducts()
      .subscribe(serverResponse => {
        if (serverResponse) {
          if (serverResponse.response) {
            console.log(serverResponse.data.cart);
            this.cart = serverResponse.data.cart;
            // this.cart.forEach( (item, index) => {
            //   if (item.product) this.total += ((item.product.salesPrice - ((item.product.discount / 100) * item.product.salesPrice)) * item.quantity);
            // });
          } else {
            this.cart = [];
            console.log(serverResponse.error);
          }
        } else {
          this.cart = [];
          console.log('error');
        }
      });
  }

  // increaseQuantity(cartProduct) {
  //   if (cartProduct.quantity && Number.isInteger(cartProduct.quantity)) {
  //     cartProduct.quantity = cartProduct.quantity + 1;
  //   } else {
  //     cartProduct.quantity = 1;
  //   }
  //   this.totalPrice();
  // }

  // decreaseQuantity(cartProduct) {
  //   if (cartProduct.quantity && Number.isInteger(cartProduct.quantity) && cartProduct.quantity > 1) {
  //     cartProduct.quantity = cartProduct.quantity - 1;
  //   } else {
  //     cartProduct.quantity = 1;
  //   }
  // }
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
    console.log('!st Total sum of usama = ',this.total);
    localStorage.setItem('localCart',JSON.stringify(this.getcartDetail));
    // let sum = this.getcartDetail
    // this.CartitemPrice=sum;
    // console.log(sum);

  }
  deleteItem(item){
    console.log(item);
    if(localStorage.getItem('localCart')){
      this.getcartDetail=JSON.parse(localStorage.getItem('localCart'));
      for(let i=0; i<this.getcartDetail.length;i++){
        if(this.getcartDetail[i].id=== item){
          this.getcartDetail.splice(i,1);
          localStorage.setItem('localCart',JSON.stringify(this.getcartDetail));
          this.loadCart();
          this.totalPrice();
          console.log('DEl Total sum of usama = ',this.total);
          
        }
      }
    }
  } 
  
}
