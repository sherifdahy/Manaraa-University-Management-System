import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-get-all-faculties',
  templateUrl: './faculties-grid.component.html',
  styleUrls: ['./faculties-grid.component.css'],
  standalone: false,
})
export class FacultiesGridComponent implements OnInit {
  @Input() universityId: number = 0;
  constructor(private activeRouter: ActivatedRoute) {}

  ngOnInit() {}
}
