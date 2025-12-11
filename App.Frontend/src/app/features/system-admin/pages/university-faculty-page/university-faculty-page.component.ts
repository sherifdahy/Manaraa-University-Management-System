import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-university-faculty-page',
  templateUrl: './university-faculty-page.component.html',
  styleUrls: ['./university-faculty-page.component.css'],
  standalone: false,
})
export class UniversityFacultyPageComponent implements OnInit {
  univsersityId: number = 0;
  constructor(private activatedRoute: ActivatedRoute) {}
  //This Will Contains 2 Components
  //1.Edit University Component which want the Id
  //2.Add Or Edit Faculty Which Want the Id
  //3.Tables of All Faculties
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.univsersityId = Number(params.get('universityId'));
    });
  }

  private setUniversityId() {}
}
