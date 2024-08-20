import { Component, OnInit } from '@angular/core';
import { BloodDonorsService } from './blood-donors.service';
import { BloodDonorsStatisticsResponse } from './interfaces/blood-donors-statistics'
import { tap } from 'rxjs';

@Component({
  selector: 'app-blood-donors',
  templateUrl: './blood-donors.component.html',
  styleUrls: ['./blood-donors.component.css']
})
export class BloodDonorsComponent implements OnInit {

  file: File | undefined = undefined;
  fileName: string |undefined = undefined;
  bloodDonorsStatisticsResponse: any;

  constructor(
    private bloodDonorsService: BloodDonorsService,
  ) {}

  ngOnInit(): void {
    this.bloodDonorsService.getStatistics().subscribe(result => {
      this.bloodDonorsStatisticsResponse = result
    });
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name;
  }

  onSubmit() {
    if (this.file) {
      this.bloodDonorsService.uploadAndAnalyze(this.file)
        .pipe(
          tap(data => {
            this.bloodDonorsStatisticsResponse = data as BloodDonorsStatisticsResponse;
          })
        )
        .subscribe();
    }

    this.file = undefined
    this.fileName = undefined
  }
  
}
