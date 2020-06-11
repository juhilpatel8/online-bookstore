import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup:FormGroup;
  cartItems: CartItem[] = [];
  totalPrice:number = 0;
  
  constructor(private _formBuilder: FormBuilder,
              private _cartService: CartService) { }

  ngOnInit(): void {
    this.cartDetails();
    this.checkoutFormGroup = this._formBuilder.group({
      customer: this._formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this._formBuilder.group({
        street: [''],
        city: [''],
        state:[''],
        country: [''],
        zipcode: ['']
      }),
      billingAddress: this._formBuilder.group({
        street: [''],
        city: [''],
        state:[''],
        country: [''],
        zipcode: ['']
      }),
      creditCard: this._formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        expirationMonth: [''],
        expirationYear: [''],
        cvv: ['']
      })
    })
  }


  onSubmit(){
    console.log('purchase book');
    
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log(this.checkoutFormGroup.get('shippingAddress').value);
    console.log(this.checkoutFormGroup.get('billingAddress').value);
    console.log(this.checkoutFormGroup.get('creditCard').value);
    
  }

  copyShippingAddressToBillingAddress(event){
    if (event.target.checked) {     
      this.checkoutFormGroup.controls.billingAddress
      .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

  cartDetails(){
    this.cartItems = this._cartService.cartItems;
    this._cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )
    this._cartService.calculateTotalPrice();
  }
}