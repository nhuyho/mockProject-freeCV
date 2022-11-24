import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetCv } from '../shared/models/cv.model';
import { API_BASE } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  API_CV_LIST = API_BASE + 'list-cv.json';
  constructor(private http : HttpClient) { }

  getCvList(): Observable<GetCv>{
    return this.http.get<GetCv>(this.API_CV_LIST);
  }
}
