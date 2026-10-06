import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CursorTrailComponent } from './shared/components/cursor-trail/cursor-trail/cursor-trail';

@Component({
  imports: [RouterOutlet, CursorTrailComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('tp_angular');
}
