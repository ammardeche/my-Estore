import { Component, Input, input, OnInit, signal } from '@angular/core';
import { IProduct } from '../../core/models/IProduct';

@Component({
  selector: 'app-line-items-cart',
  imports: [],
  templateUrl: './line-items-cart.component.html',
  styleUrl: './line-items-cart.component.css',
})
export class LineItemsCartComponent implements OnInit {
  @Input() product!: IProduct;

  quantity = Array<number>();

  ngOnInit(): void {
    const QuantityOption = Array.from(
      { length: this.product.stock + 1 },
      (_, i) => i
    );
    this.quantity = QuantityOption;
  }
}
