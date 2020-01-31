import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateContactsPage } from './update-contacts.page';

describe('UpdateContactsPage', () => {
  let component: UpdateContactsPage;
  let fixture: ComponentFixture<UpdateContactsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateContactsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateContactsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
