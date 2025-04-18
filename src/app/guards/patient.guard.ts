// patient.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn , Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const patientGuard: CanActivateFn = (route, state) => {
  const toastr = inject(ToastrService);
  const userType = localStorage.getItem('userType');
  if (userType === 'Patient') {
    return true;
  } else {
    toastr.error('You are not authorized to view this page.', 'Access Denied');
    return false;
  }
};
