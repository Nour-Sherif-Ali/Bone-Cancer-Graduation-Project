import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { finalize } from 'rxjs/operators'; 

interface FileMap {
  [key: string]: File;
}

@Component({
  selector: 'app-start-diagnosis',
  imports : [CommonModule],
  templateUrl: './start-diagnosis.component.html',
  styleUrls: ['./start-diagnosis.component.scss']
})
export class StartDiagnosisComponent {
 
  selectedFile: File | null = null;
  result: string = '';
  loading = false;
  imageUrl: string = '';

  constructor(private http: HttpClient , private router: Router ) {}

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
  
    this.http.post<{ result: string, image_url: string }>('http://127.0.0.1:5000/predict', formData)
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.router.navigate(['/diagnosis-result'], {
            state: {
              result: res.result,
              image: res.image_url
            }
          });
        },
        error: () => {
          this.result = 'Error uploading or processing file';
          this.loading = false;
        }
      });
  }
  
    };
  
    
  

