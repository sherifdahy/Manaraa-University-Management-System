import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { RolesService } from './core/services/roles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App   {
  protected readonly title = signal('Manara Platform');
}
