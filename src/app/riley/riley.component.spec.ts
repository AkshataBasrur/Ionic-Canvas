import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RileyComponent } from './riley.component';

describe('RileyComponent', () => {
  let component: RileyComponent;
  let fixture: ComponentFixture<RileyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RileyComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RileyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
