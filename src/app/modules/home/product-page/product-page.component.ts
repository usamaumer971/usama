import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../shared/services/product/product.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ClientService} from '../../../shared/services/client/client.service';
import {CartNumService} from 'src/app/cart-num.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  product: any;
  id = '';
  quantity = 1;
  addedToCart: false;
  message: { type: string; text: string } = null;
  server = environment.apiServer;

  constructor(
    private cartnumService: CartNumService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: ClientService
  ) {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.getProducts();
      }
    );
  }
  ngOnInit() {
  }
 
  getProducts() {
    this.productService.getOne(this.id)
      .subscribe(serverResponse => {
        if (serverResponse) {
          if (serverResponse.response) {
            this.product = serverResponse.data.products[0];
          } else {
            console.log(serverResponse.error);
          }
        } else {
          console.log('error');
        }
      });
  }

  addToCart() {
    if (sessionStorage.getItem('c_jwt')) {
      if (sessionStorage.getItem('c_role') === 'user') {
        const cartItem = {product: this.product, productQuantity:1};
        this.submitProductToCart(cartItem);
      } else {
        this.router.navigate(['login']);
      }
    } else {
      this.router.navigate(['login']);
    }
  }
  itemCart:any=[];
  CartitemDetail(){
    if(localStorage.getItem('localCart')){
      this.itemCart=JSON.parse(localStorage.getItem('localCart'));
      console.log(this.itemCart);
    }
  }
  submitProductToCart(product) {
    // console.log(category);
    let cartDataNull = localStorage.getItem('localCart');
    if(cartDataNull == null){
      let storeDataGet:any=[];
      storeDataGet.push(product);
      localStorage.setItem('localCart',JSON.stringify(storeDataGet));

    }
    else{
      var id= product.id;
      let index : number = -1;
      this.itemCart=JSON.parse(localStorage.getItem('localCart')); 
      for(let i=0; i<this.itemCart.length;i++){
        if(parseInt(id)===parseInt(this.itemCart[i].prodId)){
          this.itemCart[i].quantity=product.quantity;
          index=i;
          break;
        }
      }
      if(index==-1){
        this.itemCart.push(product);
        localStorage.setItem('localCart',JSON.stringify(this.itemCart));

      } 
      else{
        localStorage.setItem('localCart',JSON.stringify(this.itemCart));
      }
    }
    this.CartNumFunc();
    // localStorage.setItem('localCart',JSON.stringify(category));
  }
  CartNum:any=0;
  CartNumFunc(){
    if(localStorage.getItem('localCart')!=null){
      var cartValue=JSON.parse(localStorage.getItem('localCart'));
      
      //  console.log(count);
       this.CartNum=cartValue.length;
       this.cartnumService.cartSubject.next(this.CartNum);
       console.log(this.CartNum);

    }
    
  }



  // submitProductToCart(item: any) {
  //   this.userService.addProductToCart(item)
  //     .subscribe(serverResponse => {
  //       if (serverResponse) {
  //         if (serverResponse.response) {
  //           this.message = {
  //             type: 'success',
  //             text: 'Product added to cart'
  //           };
  //         } else {
  //           this.message = {
  //             text: serverResponse.error.details.replace('"', '').replace('"', ''),
  //             type: 'danger'
  //           };
  //         }
  //       } else {
  //         this.message = {
  //           text: 'Error connecting to internet',
  //           type: 'danger'
  //         };
  //       }
  //     });
  // }

}
