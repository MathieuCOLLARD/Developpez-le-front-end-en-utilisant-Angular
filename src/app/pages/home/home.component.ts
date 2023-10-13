import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';
import { Participation } from '../../core/models/Participation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  public view!: [number, number]
  public results!: [{ name: string; value: number }];
  public numberOfJO!: number;
  public totalCountries!: number;
  public showLabels!: boolean
  public totalMedals!: number;
  constructor(private olympicService: OlympicService, private router: Router) { }

  ngOnInit(): void {
    // Set initial values for ngx-charts
    this.showLabels = true;
    this.view = [window.innerWidth / 1.2, 400];

    // Get olympics data
    this.olympics$ = this.olympicService.getOlympics();

    // Subscribe to olympics data
    this.olympics$.subscribe((olympics) => {
      // Map olympics data to results array for ngx-charts
      this.results = olympics?.map((olympic: Olympic) => {
        // Calculate total medals for each olympic
        this.totalMedals = olympic.participations.reduce(
          (total: number, participation: Participation) => {
            return total + participation.medalsCount;
          },
          0
        );
        return {
          name: olympic.country,
          value: this.totalMedals,
        };
      });
      // Calculate number of olympic games
      this.numberOfJO = olympics?.length;

      // Calculate total number of countries
      this.totalCountries = olympics?.map((olympic: Olympic) => olympic.country)
        .filter((value: string, index: number, self: string[]) => {
          return self.indexOf(value) === index;
        }).length;
    });
  }

  // Navigate to country page on select
  onSelect(event: any) {
    this.router.navigateByUrl(`country/${event.name}`);
  }

  // Resize chart on window resize
  onResize(event: any) {
    this.view = [event.target.innerWidth / 1.1, 400];
  }
}
