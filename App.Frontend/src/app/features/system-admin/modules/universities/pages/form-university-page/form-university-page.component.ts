import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from '../../../../../../core/services/auth/auth.service';
import { AuthenticatedUserResponse } from '../../../../../../core/models/auth/responses/authenticated-user-response';
import { Permissions } from '../../../../../../core/constants/permission-consts';

@Component({
  selector: 'app-form-university-page',
  templateUrl: './form-university-page.component.html',
  styleUrls: ['./form-university-page.component.css'],
  standalone: false,
})
export class FormUniversityPageComponent implements OnInit {
  univsersityId: number = 0;
  facultySaved$ = new Subject<void>();
  editPressd$ = new Subject<number>();
  currentUser: AuthenticatedUserResponse | null = null;
  permissions: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.currentUser;
    this.permissions = Permissions;
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.univsersityId = Number(params.get('universityId'));
    });
  }
  onFacultySaved() {
    this.facultySaved$.next();
  }
  onEditPressd(id: number) {
    this.editPressd$.next(id);
  }
}
