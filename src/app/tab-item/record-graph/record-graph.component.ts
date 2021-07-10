import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { GraphService } from 'src/app/services/graph.service';
import { ChartType, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-record-graph',
  templateUrl: './record-graph.component.html',
  styleUrls: ['./record-graph.component.css']
})
export class RecordGraphComponent implements AfterViewInit {

  @ViewChild(BaseChartDirective) public chart!:BaseChartDirective

  graphTitle = ""

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {       
            min: 0,
            suggestedMax: 15
       }}],
    },
  }

  barChartType: ChartType = 'bar'
  barChartLegend = false
  barChartPlugins = []

  constructor(public graphService:GraphService) {
    this.graphTitle = this.graphService.getTitle()
  }

  ngAfterViewInit(): void {}

  updateChart(def:number){
    this.graphService.correntDateCount += def
    this.graphService.barChartLabelsDate = this.graphService.getchartLabel()
    this.graphService.barChartDataDate[0].data = this.graphService.getStudyTimeDate()
    this.graphTitle = this.graphService.getTitle()
  }
}
