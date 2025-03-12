import { Component } from '@angular/core';
import { RouterLink  } from '@angular/router';

@Component({
  selector: 'app-treatement-suggestion',
  imports: [RouterLink],
  templateUrl: './treatement-suggestion.component.html',
  styleUrl: './treatement-suggestion.component.scss'
})
export class TreatementSuggestionComponent {
  downloadReport() {
    // Sample report content
    const reportContent = `
      Patient Name: John Doe
      Age: 45
      Diagnosis: Bone Cancer
      Treatment Plan: Chemotherapy & Radiation Therapy
      Doctor: Dr. Smith
      Date: ${new Date().toLocaleDateString()}
    `;
  
    // Create a Blob (text file)
    const blob = new Blob([reportContent], { type: 'text/plain' });
  
    // Create a link element and trigger download
    const a = document.createElement('a');
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = 'Patient_Report.txt';
    document.body.appendChild(a);
    a.click();
  
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

}
