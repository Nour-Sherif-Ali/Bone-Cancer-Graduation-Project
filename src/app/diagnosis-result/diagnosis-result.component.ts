import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-diagnosis-result',
  imports: [CommonModule],
templateUrl: './diagnosis-result.component.html',
  styleUrl: './diagnosis-result.component.scss'
})
export class DiagnosisResultComponent {
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  analysisResult: string | null = null;

  // Handle File Upload
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      // Preview Image
      const reader = new FileReader();
      reader.onload = (e: any) => this.imageUrl = e.target.result;
      reader.readAsDataURL(file);
    }
  }

  // Simulate AI Analysis (Replace with actual API call)
  analyzeScan() {
    this.analysisResult = "Analysis complete! No abnormalities detected."; // Mock result
  }
}
