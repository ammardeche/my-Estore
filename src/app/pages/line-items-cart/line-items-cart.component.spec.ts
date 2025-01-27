import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineItemsCartComponent } from './line-items-cart.component';

describe('LineItemsCartComponent', () => {
  let component: LineItemsCartComponent;
  let fixture: ComponentFixture<LineItemsCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineItemsCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineItemsCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
