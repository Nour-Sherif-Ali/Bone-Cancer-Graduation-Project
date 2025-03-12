import { Component, inject } from '@angular/core';
import { MedicalFormatService } from '../services/medical-format.service';

@Component({
  selector: 'app-meidcal-info',
  imports: [],
  templateUrl: './meidcal-info.component.html',
  styleUrl: './meidcal-info.component.scss'
})
export class MeidcalInfoComponent {
  _MedicalFormatService=inject(MedicalFormatService); 

  ngOnInit(): void {
    this._MedicalFormatService.getNewsItem().subscribe({
      next: (resp) => {
        console.log(resp);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
