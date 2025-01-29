import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UiService } from '../../core/services/ui.service';
import { CartItemService } from '../../core/services/cart-item.service';
import { map } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  faStore,
  faCartShopping,
  faSearch,
  faUser,
  faCaretUp,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import { NgClass } from '@angular/common';
import { CartComponent } from '../../pages/cart/cart.component';

@Component({
  selector: 'app-header',
  imports: [FormsModule, FontAwesomeModule, NgClass, CartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  Quantity = signal<number>(0);

  constructor(private cartItem_service: CartItemService) {}

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
    this.IsCartOpened.update((value) => !value);
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
