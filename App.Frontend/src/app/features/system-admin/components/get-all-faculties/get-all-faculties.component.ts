import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-get-all-faculties',
  templateUrl: './get-all-faculties.component.html',
  styleUrls: ['./get-all-faculties.component.css'],
  standalone: false,
})
export class GetAllFacultiesComponent implements OnInit {
  @Input() universityId: number = 0;
  constructor(private activeRouter: ActivatedRoute) {}

  ngOnInit() {}
}
