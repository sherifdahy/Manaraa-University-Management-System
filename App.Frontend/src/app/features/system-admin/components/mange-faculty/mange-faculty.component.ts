import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mange-faculty',
  templateUrl: './mange-faculty.component.html',
  styleUrls: ['./mange-faculty.component.css'],
  standalone: false,
})
export class MangeFacultyComponent implements OnInit {
  @Input() universityId: number = 0;
  constructor(private activeRouter: ActivatedRoute) {}

  ngOnInit() {}
}
