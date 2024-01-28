import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaIndividualComponent } from './noticia-individual.component';

describe('NoticiaIndividualComponent', () => {
  let component: NoticiaIndividualComponent;
  let fixture: ComponentFixture<NoticiaIndividualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoticiaIndividualComponent]
    });
    fixture = TestBed.createComponent(NoticiaIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
