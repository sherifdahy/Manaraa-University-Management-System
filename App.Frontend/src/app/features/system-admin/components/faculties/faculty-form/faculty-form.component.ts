import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mange-faculty',
  templateUrl: './faculty-form.component.html',
  styleUrls: ['./faculty-form.component.css'],
  standalone: false,
})
export class FacultyFormComponent implements OnInit {
  @Input() universityId: number = 0;
  constructor(private activeRouter: ActivatedRoute) {}

  ngOnInit() {}
}
