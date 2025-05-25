import { Component } from '@angular/core';
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
export class AppComponent {
  balloonsOnView = 3
  balloons: IntBalloon[] = new Array(this.balloonsOnView).fill(0).map(
    () => new Balloon()
  )
  score = 0
  missed = 0
}
