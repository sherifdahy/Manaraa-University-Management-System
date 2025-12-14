import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles-page',
  standalone: false,
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
  constructor(private router: Router) {}

}
