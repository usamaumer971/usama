import { Component, OnInit } from '@angular/core';
import {SellerService} from '../../../../shared/services/Seller/seller.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  products = [];
  orders = [];
  messages = 0;
  earning = 0;

  constructor(
    private sellerService: SellerService,
  ) {
    this.getProducts();
  }

  ngOnInit() {
  }


  getProducts() {
    this.sellerService.getSellerProducts()
      .subscribe(serverResponse => {
        if (serverResponse) {
          if (serverResponse.response) {
            this.products = serverResponse.data.products;
          } else {
            console.log(serverResponse.error);
          }
        } else {
          console.log('error');
        }
      });
  }

}
