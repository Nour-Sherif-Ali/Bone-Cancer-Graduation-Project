import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-home',
  imports : [CommonModule],
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.scss']
})
export class DoctorHomeComponent implements OnInit {
  // Mock data - in a real app, these would come from a service
  patientCount: Observable<number> = of(142);
  pendingCases: Observable<number> = of(8);
  aiAssistedDiagnoses: Observable<number> = of(67);
  urgentCases: Observable<number> = of(3);

  constructor(private router: Router) { }

  ngOnInit(): void {
    // You would typically load real data here from services
    // this.loadDashboardData();
  }

  // Navigation methods
  navigateToPatientQueue(): void {
    this.router.navigate(['/doctor/patient-queue']);
  }

  navigateToDiagnosis(): void {
    this.router.navigate(['/doctor/diagnosis']);
  }

  navigateToReports(): void {
    this.router.navigate(['/doctor/reports']);
  }

  navigateToTelemedicine(): void {
    this.router.navigate(['/doctor/telemedicine']);
  }

  // In a real application, you would have methods to load data from services
  /*
  private loadDashboardData(): void {
    this.dashboardService.getPatientCount().subscribe(count => {
      this.patientCount = count;
    });
    
    this.dashboardService.getPendingCases().subscribe(cases => {
      this.pendingCases = cases;
    });
    
    // ... and so on for other data points
  }
  */
}