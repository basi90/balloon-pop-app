import { Component, ElementRef, EventEmitter, inject, input, OnInit, Output, output } from '@angular/core';
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
  @Output() balloonPopped = new EventEmitter<string>()

  ngOnInit(): void {
    this.animateBalloon()
  }

 animateBalloon() {
    const buffer = 20;
    const balloonEl = this.elementRef.nativeElement.firstChild;

    const maxWidth = window.innerWidth - balloonEl.clientWidth - buffer;
    const leftPosition = Math.floor(Math.random() * maxWidth);

    const minSpeed = 5
    const speedVariation = 5
    const speed = minSpeed + Math.random() * speedVariation

    balloonEl.style.position = 'fixed';
    balloonEl.style.left = `${leftPosition}px`;
    balloonEl.style.bottom = '0';

    const flyAnimation = this.animationBuilder.build([
      style({ transform: 'translateY(0)' }),
      animate(`${speed}s ease-out`, style({ transform: 'translateY(-100vh)' }))
    ]);

    const player = flyAnimation.create(balloonEl);
    player.play();
    player.onDone(() => {
      console.log('animation finished');
    });
  }

  pop() {
    this.balloonPopped.emit(this.balloon().id)
  }
}
