import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoCardPokemonComponent } from './photo-card-pokemon.component';

describe('PhotoCardPokemonComponent', () => {
  let component: PhotoCardPokemonComponent;
  let fixture: ComponentFixture<PhotoCardPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoCardPokemonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoCardPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
