import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { NewsletterComponent } from '../pages/newsletter/newsletter.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    HeaderComponent,
    NewsletterComponent,
    FooterComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {}
