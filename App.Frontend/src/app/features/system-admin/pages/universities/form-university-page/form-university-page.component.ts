import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-university-page',
  templateUrl: './form-university-page.component.html',
  styleUrls: ['./form-university-page.component.css'],
  standalone: false,
})
export class FormUniversityPageComponent implements OnInit {
  univsersityId: number = 0;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.univsersityId = Number(params.get('universityId'));
    });
  }
}
