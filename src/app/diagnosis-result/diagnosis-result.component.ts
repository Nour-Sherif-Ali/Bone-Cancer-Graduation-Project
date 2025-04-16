import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diagnosis-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diagnosis-result.component.html',
  styleUrl: './diagnosis-result.component.scss'
})
export class DiagnosisResultComponent {
  @Input() resultText: string = "Analyzing image...";
  @Input() uploadedImageUrl: string = '';
  
  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { result: string; image: string };

    this.resultText = state?.result ?? 'Unknown';
    this.uploadedImageUrl = state?.image ?? '';
  }

  fetchNewResult() {
    this.router.navigate(['./diagnosis']);
  }
}
