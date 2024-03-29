import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { Character } from '../../interfaces/character';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardComponent],
    });

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display character info', () => {
    const characterInfo: Character = {
      id: 1,
      name: 'Test Name',
      location: { name: 'Test Location', url: '' },
      status: 'Test Status',
      species: 'Human',
      image: 'url.sample',
    };

    component.characterInfo = characterInfo;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('.card-name-container p').textContent
    ).toContain(characterInfo.name);
    expect(
      compiled.querySelector('.card-location-container p').textContent
    ).toContain(characterInfo.location.name);
    expect(
      compiled.querySelector('.card-status-container p').textContent
    ).toContain(characterInfo.status);
  });
});
