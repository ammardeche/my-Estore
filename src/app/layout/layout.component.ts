import { Component, Signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { NewsletterComponent } from '../pages/newsletter/newsletter.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from '../pages/cart/cart.component';
import { UiService } from '../core/services/ui.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    HeaderComponent,
    NewsletterComponent,
    FooterComponent,
    CartComponent,
    NgClass,
  ],

  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  isCartOpened!: Signal<boolean>;

  constructor(private uiService: UiService) {
    this.isCartOpened = this.uiService.getCartState();
  }

  closecart() {
    this.uiService.setCartState(false);
  }
}
