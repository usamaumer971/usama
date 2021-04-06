import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-seller-orders",
  templateUrl: "./seller-orders.component.html",
  styleUrls: ["./seller-orders.component.scss"],
})
export class SellerOrdersComponent implements OnInit {
  orders = [
    {
      document: "A53",
      orderNo: "Oppo",
      orderDate: "Mobiles",
      pendingSince: "$269",
      paymentMethod: "sent",
      retailPrice: "$100",
      no: "23",
      status: "Pending",
      shipmentOnTimeSLA: "anything",
      printed: "Y not",
      actions: "NO actions",
    },
    {
      document: "A53",
      orderNo: "Oppo",
      orderDate: "Mobiles",
      pendingSince: "$269",
      paymentMethod: "sent",
      retailPrice: "$100",
      no: "23",
      status: "Pending",
      shipmentOnTimeSLA: "anything",
      printed: "Y not",
      actions: "NO actions",
    },
    {
      document: "A53",
      orderNo: "Oppo",
      orderDate: "Mobiles",
      pendingSince: "$269",
      paymentMethod: "sent",
      retailPrice: "$100",
      no: "23",
      status: "Pending",
      shipmentOnTimeSLA: "anything",
      printed: "Y not",
      actions: "NO actions",
    },
  ];
  model;
  isLoading = 0;

  constructor() {}

  ngOnInit() {}
}
