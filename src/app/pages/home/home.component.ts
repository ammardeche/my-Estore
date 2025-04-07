import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { IProduct } from '../../core/models/IProduct';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { animate } from '@angular/animations';
import { CategoryItemComponent } from '../category-item/category-item.component';
import { CategoriesComponent } from '../categories/categories.component';
import { ListComponent } from '../list/list.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    ButtonModule,
    CategoryItemComponent,
    ListComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: IProduct[] = [];

  ngOnInit(): void {
    this.prodService.OffersProduct().subscribe((res) => {
      this.products = res;
      console.log(this.products);
    });
  }

  constructor(private prodService: ProductService) {}
}
