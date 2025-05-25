import { Component, ElementRef, EventEmitter, inject, input, OnInit, Output, output } from '@angular/core';
import { IntBalloon } from '../../model/balloon.interface';
import { animate, AnimationBuilder, keyframes, style } from "@angular/animations";

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
  @Output() balloonMissed = new EventEmitter()

  ngOnInit(): void {
    this.animateBalloon()
  }

 animateBalloon() {
    const buffer = 20;
    const balloonEl = this.elementRef.nativeElement.firstChild

    const maxWidth = window.innerWidth - balloonEl.clientWidth - buffer
    const leftPosition = Math.floor(Math.random() * maxWidth)

    const minSpeed = 2
    const speedVariation = 3
    const speed = minSpeed + Math.random() * speedVariation

    balloonEl.style.position = 'fixed'
    balloonEl.style.left = `${leftPosition}px`
    balloonEl.style.bottom = '0'

    const flyAnimation = this.animationBuilder.build([
      style({ transform: 'translateY(0)' }),
      animate(`${speed}s ease-in-out`, style({ transform: 'translateY(-100vh)' }))
    ]);

    const player = flyAnimation.create(balloonEl)
    player.play()
    player.onDone(() => {
      console.log('animation finished');
      this.balloonMissed.emit(this.balloon().id)
    });
  }

  pop() {
    const popAnimation = this.animationBuilder.build([
      animate('0.2s ease-out', keyframes([
        style({
          scale: '1.2',
          offset: 0.5
        }),
        style({
          scale: '1.2',
          offset: 0.75
        })
      ]))
    ])
    const player = popAnimation.create(this.elementRef.nativeElement.firstChild)
    player.play()
    player.onDone(() => {
      this.balloonPopped.emit(this.balloon().id)
    })
  }
}
