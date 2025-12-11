import { Component, OnInit } from '@angular/core';
import { UniversityResponse } from '../../../../core/models/university/responses/university-response';
import { UnivsersityService } from '../../../../core/services/university/univsersity-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-get-all-universty',
  standalone: false,
  templateUrl: './get-all-universty.html',
  styleUrl: './get-all-universty.css',
})

//TODO Alert For Delete
export class GetAllUniverstyComponent implements OnInit {
  values$!: Observable<UniversityResponse[]>;

  constructor(private universityService: UnivsersityService) {}

  ngOnInit(): void {
    this.assignValues();
  }
  trackById(index: number, item: any) {
    return item.id;
  }

  delete(id: number) {
    this.universityService.toggleStatus(id).subscribe({
      next: () => {
        this.assignValues();
      },
    });
  }

  private assignValues() {
    this.values$ = this.universityService.getAll();
  }
}
