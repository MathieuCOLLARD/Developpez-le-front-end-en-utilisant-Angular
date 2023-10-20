import { Participation } from './../../core/models/Participation';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Observable, of } from 'rxjs';
import { Olympic } from '../../core/models/Olympic';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {
  public olympics$!: Observable<Olympic[]>;
  public countryName!: string
  public totalEntries!: number
  public totalMedals!: number
  public totalAthletes!: number
  public lineChartResults!: { name: string; series: { name: number; value: number; }[]; }[];
  public view!: [number, number];
  public showLabels!: boolean;
  public animations!: boolean;
  public xAxis!: boolean;
  public yAxis!: boolean;
  public showXAxisLabel!: boolean;
  public showYAxisLabel!: boolean;
  public xAxisLabel!: string;
  public yAxisLabel!: string;
  public autoScale!: boolean;
  public showRefLabels!: boolean;
  public showRefLines!: boolean;
  public showGridLines!: boolean;
  public roundDomains!: boolean;
  
  constructor(private route: ActivatedRoute, private olympicService: OlympicService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.countryName = this.route.snapshot.params['countryName'];

    // Set initial values for ngx-charts
    this.view = [window.innerWidth / 1.2, window.innerHeight / 1.5];
    this.animations = true;
    this.showLabels = true;
    this.xAxis = true;
    this.yAxis = true;
    this.showXAxisLabel = true;
    this.showYAxisLabel = true;
    this.xAxisLabel = 'Dates';
    this.yAxisLabel = 'Medals';
    this.autoScale = true;
    this.showRefLabels = true;
    this.showRefLines = true;
    this.showGridLines = true;
    this.roundDomains = true;
    
    // Get olympics data
    this.olympics$ = this.olympicService.getOlympics();

    // Subscribe to olympics data
    this.olympics$.subscribe((olympics) => {

      // Calculate total entries for each country
      this.totalEntries = olympics?.filter((olympic: Olympic) => olympic.country === this.countryName)[0].participations.length;

      // Calculate total medals for each country
      this.totalMedals = olympics?.filter((olympic: Olympic) => olympic.country === this.countryName)[0].participations.reduce(
        (total: number, participation: Participation) => {
          return total + participation.medalsCount;
        },
        0
      );

      // Calculate total athletes for each country
      this.totalAthletes = olympics?.filter((olympic: Olympic) => olympic.country === this.countryName)[0].participations.reduce(
        (total: number, participation: Participation) => {
          return total + participation.athleteCount;
        },
        0
      );

      // Map olympics data to results array for ngx-charts
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
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }
  // Resize chart on window resize
  onResize(event: Event): void {
    const target = event.target as Window;
    this.view = [target.innerWidth / 1.1, target.innerHeight / 1.5];
  }
}
