import { Component, ElementRef, inject, input, OnInit } from '@angular/core';
import { IntBalloon } from '../../model/balloon.interface';
import { animate, AnimationBuilder, style } from "@angular/animations";

@Component({
  selector: 'app-balloon',
  imports: [],
  templateUrl: './balloon.component.html',
  styleUrl: './balloon.component.css'
})
export class BalloonComponent implements OnInit{
  balloon = input.required<IntBalloon>()
  animationBuilder = inject(AnimationBuilder)
  elementRef = inject(ElementRef)

  ngOnInit(): void {
    this.animateBalloon()
  }

 animateBalloon() {
    const flyAnimation = this.animationBuilder.build([
      style({
        transform: 'translateY(0)',
      }),
      animate(
        '4s ease-out',
        style({
          transform: 'translateY(-40px)',
        })
      ),
    ]);

    const player = flyAnimation.create(this.elementRef.nativeElement.firstChild);
    player.play();
    player.onDone(() => {
      console.log('animation finished');
    });
  }
}
