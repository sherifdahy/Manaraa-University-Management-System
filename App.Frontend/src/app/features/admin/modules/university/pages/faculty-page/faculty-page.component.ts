import { Component, OnInit } from '@angular/core';
import { FacultyEditComponent } from '../../components/faculty-edit/faculty-edit.component';

@Component({
  selector: 'app-faculty-page',
  templateUrl: './faculty-page.component.html',
  styleUrls: ['./faculty-page.component.css'],
  imports: [FacultyEditComponent],
})
export class FacultyPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
