import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicalFormatService {

  constructor(private _HttpClient:HttpClient) { }

  getNewsItem() : Observable <any>{
    return this._HttpClient.get('https://newsapi.org/v2/everything?q=tesla&from=2025-01-27&sortBy=publishedAt&apiKey=eb6a65968ed54590952a4de637d5d729')

  }
}
