import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface FileMap {
  [key: string]: File;
}

@Component({
  selector: 'app-start-diagnosis',
  templateUrl: './start-diagnosis.component.html',
  styleUrls: ['./start-diagnosis.component.scss']
})
export class StartDiagnosisComponent {
 
  selectedFile: File | null = null;
  result: string = '';
  loading = false;

  constructor(private http: HttpClient) {}

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedFile = (target.files as FileList)[0];
  }

  uploadImage(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.loading = true;
    this.result = '';

    this.http.post<{ result: string }>('http://127.0.0.1:5000/predict', formData)
      .subscribe({
        next: (res) => {
          this.result = res.result;
          this.loading = false;
        },
        error: (err) => {
          this.result = 'Error uploading or processing file';
          this.loading = false;
        }
      });
  }

}
