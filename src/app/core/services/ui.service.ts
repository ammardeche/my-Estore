import { Injectable, signal, Signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private isOpened = signal<boolean>(false);

  toggleCart() {
    this.isOpened.update((value) => !value);
  }

  setCartState(state: boolean) {
    this.isOpened.set(state);
  }

  getCartState(): Signal<boolean> {
    return this.isOpened;
  }

  constructor() {}
}
