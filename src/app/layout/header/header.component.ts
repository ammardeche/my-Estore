import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartItemService } from '../../core/services/cart-item.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';

import { NgClass } from '@angular/common';
import { CartComponent } from '../../pages/cart/cart.component';
import { MatButtonModule } from '@angular/material/button';
import { UiService } from '../../core/services/ui.service';

@Component({
  selector: 'app-header',
  imports: [FormsModule, FontAwesomeModule, NgClass, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  Quantity = signal<number>(0);

  constructor(
    private cartItem_service: CartItemService,
    private uiService: UiService
  ) {}

  IsOpened = signal<boolean>(false);
  IsCartOpened = signal<boolean>(false);
  IsUserbox = signal<boolean>(false);

  UserBoxToggle() {
    this.IsUserbox.update((value) => !value);
  }

  toggleMenu() {
    this.IsOpened.update((value) => !value);
  }
  isCartOpen() {
    this.uiService;
  }
  ngOnInit(): void {
    this.cartItem_service.cartItemsSubject$.subscribe((res) => {
      const totalQuantity = res.reduce((sum, item) => sum + item.quantity, 0);
      this.Quantity.set(totalQuantity);
    });

    this.cartItem_service.incQuantity$.subscribe((quantity) => {
      this.Quantity.update((value) => value + quantity);
    });
  }
}
