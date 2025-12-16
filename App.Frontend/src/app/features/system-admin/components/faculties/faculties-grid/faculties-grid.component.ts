import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnivsersityService } from '../../../../../core/services/university/univsersity-service.service';
import { UniversityDetailResponse } from '../../../../../university-detail-response';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-faculties-grid',
  templateUrl: './faculties-grid.component.html',
  styleUrls: ['./faculties-grid.component.css'],
  standalone: false,
})
export class FacultiesGridComponent implements OnInit, OnChanges {
  @Input() universityId: number = 0;
  universityDetail$: Observable<UniversityDetailResponse> =
    {} as Observable<UniversityDetailResponse>;
  constructor(
    private activeRouter: ActivatedRoute,
    private universityService: UnivsersityService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.universityDetail$ = this.universityService.get(this.universityId);
  }
  ngOnInit() {}
}
