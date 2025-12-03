import { Component, OnInit, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {

  constructor() { }

  protected readonly title = signal('Manara Platform');
}
