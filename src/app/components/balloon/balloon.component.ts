import { Component, inject, input } from '@angular/core';
import { IntBalloon } from '../../model/balloon.interface';
import { AnimationBuilder } from "@angular/animations";

@Component({
  selector: 'app-balloon',
  imports: [],
  templateUrl: './balloon.component.html',
  styleUrl: './balloon.component.css'
})
export class BalloonComponent {
  balloon = input.required<IntBalloon>()
  animationBuilder = inject(AnimationBuilder)
}
