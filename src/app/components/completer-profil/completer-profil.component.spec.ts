import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleterProfilComponent } from './completer-profil.component';

describe('CompleterProfilComponent', () => {
  let component: CompleterProfilComponent;
  let fixture: ComponentFixture<CompleterProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleterProfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleterProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
