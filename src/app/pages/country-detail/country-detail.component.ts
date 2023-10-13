import { Participation } from './../../core/models/Participation';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Observable, of } from 'rxjs';
import { Olympic } from '../../core/models/Olympic';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  public countryName!: string
  public totalEntries!: number
  public totalMedals!: number
  public totalAthletes!: number
  public view!: [number, number]
  public lineChartResults!: [{ name: string; series: [{ name: string; value: number }]}];
  public dateLabel!: string;
  
  constructor(private route: ActivatedRoute, private olympicService: OlympicService) { }

  ngOnInit(): void {
    this.countryName = this.route.snapshot.params['countryName'];
    this.dateLabel = 'Dates';
    this.view = [500, 200];
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((olympics) => {
      this.totalEntries = olympics?.filter((olympic: Olympic) => olympic.country === this.countryName)[0].participations.length;
      this.totalMedals = olympics?.filter((olympic: Olympic) => olympic.country === this.countryName)[0].participations.reduce(
        (total: number, participation: Participation) => {
          return total + participation.medalsCount;
        },
        0
      );
      this.totalAthletes = olympics?.filter((olympic: any) => olympic.country === this.countryName)[0].participations.reduce(
        (total: number, participation: Participation) => {
          return total + participation.athleteCount;
        },
        0
      );
      this.lineChartResults = olympics?.filter((olympic: Olympic) => olympic.country === this.countryName).map((olympic: Olympic) => {
        return {
          name: olympic.country,
          series: olympic.participations.map((participation: Participation) => {
            return {
              name: participation.year,
              value: participation.medalsCount,
            };
          }),
        };
      });
    });
  }
}
