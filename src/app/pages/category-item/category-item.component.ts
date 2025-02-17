import { Component } from '@angular/core';
import { CatItems, ICategoryItem } from '../../core/models/ICategoryItem';

@Component({
  selector: 'app-category-item',
  imports: [],
  templateUrl: './category-item.component.html',
  styleUrl: './category-item.component.css',
})
export class CategoryItemComponent {
  categoriesItem: CatItems[] = [
    {
      icategoryItems: [
        { name: 'beauty', imagePath: '/beauty.png' },
        { name: 'groceries', imagePath: '/groceries.png' },
        { name: 'parfume', imagePath: '/parfume.webp' },
        { name: 'furniture', imagePath: '/furniture.png' },
      ],
    },
  ];
}
