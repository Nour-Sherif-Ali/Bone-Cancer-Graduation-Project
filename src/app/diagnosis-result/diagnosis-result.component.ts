import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-diagnosis-result',
  imports: [CommonModule],
templateUrl: './diagnosis-result.component.html',
  styleUrl: './diagnosis-result.component.scss'
})
export class DiagnosisResultComponent {
  
    resultText = "Analyzing data... Prediction complete: High confidence level detected in the submitted input.";
  
    fetchNewResult() {
      this.resultText = "Fetching new analysis..."; 
      // simulate API call or actual logic
      setTimeout(() => {
        this.resultText = "New analysis: Input classified as Category X with 93% confidence.";
      }, 1500);
    }
  }
  

