import { Component, signal } from '@angular/core';
import { RegistroComponent } from './registro/registro.component';

@Component({
  imports: [RegistroComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('mi-primer-proyecto');
}

