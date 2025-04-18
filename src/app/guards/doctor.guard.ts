// doctor.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const doctorGuard: CanActivateFn = (route, state) => {
  const toastr = inject(ToastrService);
  const userType = localStorage.getItem('userType');
  const router = inject(Router);

  if (userType === 'Doctor') {
    return true; // Ensure a valid GuardResult is returned
  } else {
    toastr.error('You are not authorized to view this page.', 'Access Denied');
    router.navigate(['/login']);
    return false; // Ensure a valid GuardResult is returned
  }
};
