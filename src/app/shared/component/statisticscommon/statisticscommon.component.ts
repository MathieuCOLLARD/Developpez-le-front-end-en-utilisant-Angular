import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statisticscommon',
  templateUrl: './statisticscommon.component.html',
  styleUrls: ['./statisticscommon.component.scss']
})
export class StatisticscommonComponent{
  @Input() title!: string;
  @Input() detail!: number;
  constructor() { }
}
