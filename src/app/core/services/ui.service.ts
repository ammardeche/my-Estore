import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private CounterSubject$ = new BehaviorSubject<number>(0);

  constructor() {}
}
