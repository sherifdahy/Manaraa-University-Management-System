import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-university-component',
  templateUrl: './edit-university-component.component.html',
  styleUrls: ['./edit-university-component.component.css'],
})
export class EditUniversityComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {}
}
