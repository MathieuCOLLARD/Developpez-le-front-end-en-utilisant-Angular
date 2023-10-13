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
    this.showLabels = true;
    this.view = [700, 400];
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((olympics) => {
      this.results = olympics?.map((olympic: Olympic) => {
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
      this.numberOfJO = olympics?.length;
      
      
      this.totalCountries = olympics
        ?.map((olympic: Olympic) => olympic.country)
        .filter((value: string, index: number, self: string[]) => {
          return self.indexOf(value) === index;
        }).length;
        

    });
  }
  onSelect(event: any) {
    this.router.navigateByUrl(`country/${event.name}`);
  }
}
