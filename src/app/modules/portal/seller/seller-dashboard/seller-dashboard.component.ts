import { Component, OnInit } from '@angular/core';
import {SellerService} from '../../../../shared/services/Seller/seller.service';

@Component({
  selector: "app-seller-dashboard",
  templateUrl: "./seller-dashboard.component.html",
  styleUrls: ["./seller-dashboard.component.scss"],
})
export class SellerDashboardComponent implements OnInit {
  products = [
    {
      name: "A53",
      brand: "Oppo",
      category: "Mobiles",
      price: "$269",
      status: "sent",
    },
    {
      name: "A53",
      brand: "Oppo",
      category: "Mobiles",
      price: "$269",
      status: "sent",
    },
    {
      name: "A71",
      brand: "Samsung",
      category: "Mobiles",
      price: "$299",
      status: "Pending",
    },
  ];
  orders = [];
  messages = "23";
  earning = "$1223";

  constructor(private sellerService: SellerService) {
    //this.getProducts();
  }

  ngOnInit() {}

  // getProducts() {
  //   this.sellerService.getSellerProducts().subscribe((serverResponse) => {
  //     if (serverResponse) {
  //       if (serverResponse.response) {
  //         this.products = serverResponse.data.products;
  //       } else {
  //         console.log(serverResponse.error);
  //       }
  //     } else {
  //       console.log("error");
  //     }
  //   });
  // }
}
