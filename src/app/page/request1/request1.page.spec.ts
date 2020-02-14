import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Request1Page } from './request1.page';

describe('Request1Page', () => {
  let component: Request1Page;
  let fixture: ComponentFixture<Request1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Request1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Request1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
