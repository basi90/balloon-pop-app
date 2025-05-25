import { Component, computed, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BalloonComponent } from './components/balloon/balloon.component';
import { IntBalloon } from './model/balloon.interface';
import { Balloon } from './model/balloon.class';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BalloonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  balloonsOnView = 3
  balloons: IntBalloon[] = new Array(this.balloonsOnView).fill(0).map(
    () => new Balloon()
  )
  score = 0
  missed = signal(0)
  gameOver = computed(() => {
    return this.missed() === 3
  })

  ngOnInit(): void {
      this.startGame()
  }

  startGame() {
    this.missed.set(0)
    this.score = 0
    this.balloons = new Array(this.balloonsOnView).fill(0).map(
      () => new Balloon()
    )
  }

  balloonPopHandler(balloonId: string) {
    this.score++
    this.balloons = this.balloons.filter(
      ballon => ballon.id !== balloonId
    )
    this.balloons.push(new Balloon())
  }

  balloonMissHandler() {
    this.missed.update((value) => value + 1)
  }
}
