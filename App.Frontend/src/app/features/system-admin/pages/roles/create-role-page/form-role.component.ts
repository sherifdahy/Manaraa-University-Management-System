import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RolesService } from '../../../../../core/services/role/roles.service';
import { ErrorHandlerService } from '../../../../../core/services/configuration/error-handler.service';
import { Permissions } from '../../../../../core/constants/permission-consts';

@Component({
  selector: 'app-form-role',
  standalone: false,
  templateUrl: './form-role.component.html',
  styleUrls: ['./form-role.component.css']
})
export class FormRoleComponent implements OnInit {
  form: FormGroup;
  permissions: { label: string; value: string }[] = [];
  groupedPermissions: { groupName: string; items: { label: string; value: string }[]; expanded: boolean }[] = [];
  isEditMode: boolean = false;
  roleId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private rolesService: RolesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private errorHandlerService: ErrorHandlerService,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      permissions: this.fb.array([], Validators.required) // FormArray للـ permissions
    });
  }

  get formRoleName() : FormControl{
    return this.form.get('name') as FormControl;
  }

  get formRolePermissions(){
    return this.form.get('permissions')
  }

  ngOnInit() {
    this.checkEditMode();
    this.loadPermissions();
  }

  checkEditMode() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.roleId = params['id'];
        this.loadRoleData();
      }
    });
  }

  loadRoleData() {
    if (!this.roleId) return;

    this.rolesService.getById(this.roleId).subscribe({
      next: (role: any) => {
        this.form.patchValue({
          name: role.name
        });

        // تحديد الـ permissions المختارة
        let permIndex = 0;
        this.groupedPermissions.forEach(group => {
          group.items.forEach(item => {
            if (role.permissions && role.permissions.includes(item.value)) {
              this.permissionsFormArray.at(permIndex).setValue(true);
            }
            permIndex++;
          });
        });
      },
      error: (error) => {
        this.errorHandlerService.handleError(error, '');
      }
    });
  }

 loadPermissions() {
  const groupedPermissions = Object.entries(Permissions).map(([groupName, groupPermissions]) => ({
    groupName,
    items: Object.entries(groupPermissions).map(([key, value]) => ({
      label: key,
      value: value
    })),
    expanded: false
  }));

  this.groupedPermissions = groupedPermissions;

  // بناء FormArray
  const permissionsFormArray = this.form.get('permissions') as FormArray;

  groupedPermissions.forEach(group => {
    group.items.forEach(_ => permissionsFormArray.push(new FormControl(false)));
  });
}

toggleGroup(index: number) {
  if (this.groupedPermissions[index]) {
    this.groupedPermissions[index].expanded = !this.groupedPermissions[index].expanded;
  }
}

getGroupPermissionIndex(groupIndex: number): number {
  let index = 0;
  for (let i = 0; i < groupIndex; i++) {
    index += this.groupedPermissions[i].items.length;
  }
  return index;
}


  get permissionsFormArray() {
    return this.form.get('permissions') as FormArray;
  }

  onSubmit() {
    if (this.form.invalid) return;

    const selectedPermissions: string[] = [];
    let permIndex = 0;

    this.groupedPermissions.forEach(group => {
      group.items.forEach(item => {
        if (this.permissionsFormArray.at(permIndex).value) {
          selectedPermissions.push(item.value);
        }
        permIndex++;
      });
    });

    const roleRequest = {
      id : Number(this.roleId),
      name: this.form.value.name,
      permissions: selectedPermissions
    };

    if (this.isEditMode && this.roleId) {
      this.rolesService.update( roleRequest).subscribe({
        next: () => {
          this.router.navigate(['/system-admin/roles']);
        },
        error: (errors) => {
          this.errorHandlerService.handleError(errors, '');
        }
      });
    } else {
      this.rolesService.create(roleRequest).subscribe({
        next: () => {
          this.router.navigate(['/system-admin/roles']);
        },
        error: (errors) => {
          this.errorHandlerService.handleError(errors, '');
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/system-admin/roles']);
  }
}
