import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-faculty-dialog',
  templateUrl: './faculty-dialog.component.html',
  styleUrls: ['./faculty-dialog.component.css'],
  imports: [SharedModule],
})
export class FacultyDialogComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
