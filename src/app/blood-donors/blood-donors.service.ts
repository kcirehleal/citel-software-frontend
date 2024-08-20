import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BloodDonorsStatisticsResponse } from "./interfaces/blood-donors-statistics";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class BloodDonorsService {
  
  private readonly API_URL = "http://localhost:8080/api-citel-software";
  
  constructor(public http: HttpClient) {}

  uploadAndAnalyze(file: File): Observable<BloodDonorsStatisticsResponse> {
    const formData = new FormData();
    formData.append('file', new Blob([file], { type: 'application/json' }), file.name);
    
    return this.http.post<BloodDonorsStatisticsResponse>(`${this.API_URL}/v1/blood-donors`, formData);
  }

  getStatistics(): Observable<BloodDonorsStatisticsResponse> {
    return this.http.get<BloodDonorsStatisticsResponse>(`${this.API_URL}/v1/blood-donors`);
  }
}