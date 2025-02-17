import { Injectable, signal, Signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private isOpenedSubject$ = new BehaviorSubject<boolean>(false);

  constructor() {}
}
