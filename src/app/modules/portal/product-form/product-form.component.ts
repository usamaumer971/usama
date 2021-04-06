import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { CategoryService } from "../../../shared/services/category/category.service";
import { ProductService } from "../../../shared/services/product/product.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.scss"],
})
export class ProductFormComponent implements OnInit {
  @ViewChild("formDirective", { static: true }) private formDirective: NgForm;
  inputForm: FormGroup;
  editMode = false;
  product;
  subCategories = [];
  message = null;
  areas = [
    { _id: "Lahore", name: "Lahore" },
    { _id: "Karachi", name: "Karachi" },
    { _id: "Faisalabad", name: "Faisalabad" },
  ];
  private images: any;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.route.params.subscribe((params: Params) => {
      this.product = params["id"];
    });

    if (this.product !== undefined) {
      this.editMode = true;
    }
    this.getCategories();

    this.inputForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      thumbnail: [""],
      brand: ["", [Validators.required]],
      category: ["", [Validators.required]],
      salesPrice: ["", [Validators.required]],
      purchasePrice: ["", [Validators.required]],
      description: ["", [Validators.required]],
      inTheBox: ["", [Validators.required]],
      cod: [true],
      fhd: [true],
      warranty: [true],
      return: [true],
      shipFrom: ["", [Validators.required]],
    });
  }

  ngOnInit() {}

  get name() {
    return this.inputForm.get("name");
  }
  get brand() {
    return this.inputForm.get("brand");
  }
  get category() {
    return this.inputForm.get("category");
  }
  get thumbnail() {
    return this.inputForm.get("thumbnail");
  }
  get salesPrice() {
    return this.inputForm.get("salesPrice");
  }
  get purchasePrice() {
    return this.inputForm.get("purchasePrice");
  }
  get description() {
    return this.inputForm.get("description");
  }
  get inTheBox() {
    return this.inputForm.get("inTheBox");
  }
  get shipFrom() {
    return this.inputForm.get("shipFrom");
  }
  get cod() {
    return this.inputForm.get("cod");
  }
  get fhd() {
    return this.inputForm.get("fhd");
  }
  get warranty() {
    return this.inputForm.get("warranty");
  }
  get return() {
    return this.inputForm.get("return");
  }

  submitForm(form) {
    form.category = this.subCategories.filter((item) => {
      return item._id === form.category;
    })[0].name;
    form.shipFrom = this.areas.filter((item) => {
      return item._id === form.shipFrom;
    })[0].name;

    console.log(form);

    const formData = new FormData();
    formData.append("file", this.images);
    formData.append("name", form.name);
    formData.append("brand", form.brand);
    formData.append("category", form.category);
    formData.append("salesPrice", form.salesPrice);
    formData.append("purchasePrice", form.purchasePrice);
    formData.append("description", form.description);
    formData.append("inTheBox", form.inTheBox);
    formData.append("shipFrom", form.shipFrom);
    formData.append("cod", form.cod);
    formData.append("fhd", form.fhd);
    formData.append("warranty", form.warranty);
    formData.append("return", form.return);

    console.log(formData);

    if (this.editMode) {
      this.editProduct(formData);
    } else {
      this.addProduct(formData);
    }
  }

  getProduct() {
    this.productService.getOne(this.product).subscribe((serverResponse) => {
      if (serverResponse) {
        if (serverResponse.response) {
          console.log(serverResponse);
          this.name.setValue(serverResponse.data.products[0].name);
          this.brand.setValue(serverResponse.data.products[0].brand);
          this.category.setValue(
            this.subCategories.filter(
              (item) => item.name === serverResponse.data.products[0].category
            )[0]._id
          );
          this.salesPrice.setValue(serverResponse.data.products[0].salesPrice);
          this.purchasePrice.setValue(
            serverResponse.data.products[0].purchasePrice
          );
          this.description.setValue(
            serverResponse.data.products[0].description
          );
          this.inTheBox.setValue(serverResponse.data.products[0].inTheBox);
          this.shipFrom.setValue(
            this.areas.filter(
              (item) => item.name === serverResponse.data.products[0].shipFrom
            )[0]._id
          );
          this.cod.setValue(serverResponse.data.products[0].cod);
          this.fhd.setValue(serverResponse.data.products[0].fhd);
          this.warranty.setValue(serverResponse.data.products[0].warranty);
          this.return.setValue(serverResponse.data.products[0].return);
        } else {
        }
      } else {
        console.log("error");
      }
    });
  }

  getCategories() {
    this.categoryService.getAllSubcategories().subscribe((serverResponse) => {
      if (serverResponse) {
        if (serverResponse.response) {
          serverResponse.data.subCategories.forEach((element) => {
            this.subCategories.push(element);
          });
        } else {
          console.log(serverResponse.error);
        }
      } else {
        console.log("error");
      }
      if (this.editMode) {
        this.getProduct();
      }
    });
  }

  addProduct(data): void {
    this.productService.add(data).subscribe((serverResponse) => {
      if (serverResponse) {
        if (serverResponse.response) {
          console.log("added");
          this.message = {
            text: "Product Added",
            type: "success",
          };
        } else {
          console.log(serverResponse.error);
          this.message = {
            text: "Please fill out all the fields",
            type: "danger",
          };
        }
      } else {
        console.log("error");
        this.message = {
          text: serverResponse.error.details.replace('"', "").replace('"', ""),
          type: "danger",
        };
      }
    });
  }

  editProduct(data): void {
    this.productService
      .update(this.product, data)
      .subscribe((serverResponse) => {
        if (serverResponse) {
          if (serverResponse.response) {
            console.log("updated");
            this.message = {
              text: "Product Updated",
              type: "warning",
            };
          } else {
            console.log(serverResponse.error);
            this.message = {
              text: "Please fill out all the fields",
              type: "danger",
            };
          }
        } else {
          console.log("error");
          this.message = {
            text: "Error submitting the request",
            type: "danger",
          };
        }
      });
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }
}
