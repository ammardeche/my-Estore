import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { IUser } from '../models/IUser';
import { ICategory } from '../models/ICategory';
import { IProduct } from '../models/IProduct';
import { HttpEndPointService } from './http-end-point.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpEndPointService);
  products!: IProduct[];
  category!: ICategory[];

  Product_Api = 'https://dummyjson.com/products';
  Category_Api = 'https://dummyjson.com/products/categories';

  private getProductsSubject$ = new BehaviorSubject<IProduct[]>([]);
  private getCategoriesSubject$ = new BehaviorSubject<ICategory[]>([]);
  private getProductByIdSubject$ = new BehaviorSubject<IProduct | null>(null);
  private OffersProductSubject$ = new BehaviorSubject<IProduct[]>([]);

  getProuducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.Product_Api).pipe(
      tap((products: IProduct[]) => {
        this.products = products;
        this.getProductsSubject$.next(products);
      }),
      catchError((error) => {
        console.error('fetch product is failed', error);
        return throwError(() => new Error('Failed to fetch products'));
      })
    );
  }
  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.Category_Api).pipe(
      tap((category: ICategory[]) => {
        this.category = category;
        this.getCategoriesSubject$.next(category);
      }),
      catchError((err) => {
        console.error('fetch category is failed', err);
        return throwError(() => new Error('Failed to fetch category'));
      })
    );
  }
  getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.Product_Api}/${id}`).pipe(
      tap((res: IProduct) => {
        this.getProductByIdSubject$.next(res);
      })
    );
  }

  OffersProduct(): Observable<IProduct[]> {
    return this.http.get<{ products: IProduct[] }>(this.Product_Api).pipe(
      map((res) => {
        if (!res.products) return [];
        return res.products.filter((p) => p.price < 3);
      }),
      tap((filtredProduct) => this.OffersProductSubject$.next(filtredProduct))
    );
  }
}
