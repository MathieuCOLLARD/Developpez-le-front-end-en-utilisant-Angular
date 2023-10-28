import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticscommonComponent } from './component/statisticscommon/statisticscommon.component';



@NgModule({
  declarations: [
    StatisticscommonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StatisticscommonComponent
  ]
})
export class SharedModule {

}
