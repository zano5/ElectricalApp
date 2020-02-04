import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateNamesPage } from './update-names.page';

describe('UpdateNamesPage', () => {
  let component: UpdateNamesPage;
  let fixture: ComponentFixture<UpdateNamesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateNamesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateNamesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
