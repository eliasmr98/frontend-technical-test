import { Component, Input } from '@angular/core';
import { Character } from '../../interfaces/character';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() characterInfo!: Character;
}
