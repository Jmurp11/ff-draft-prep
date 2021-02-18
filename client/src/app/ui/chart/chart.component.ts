import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as ch from 'ng2-charts';
import { Chart as ChartModel } from './chart.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input()
  chartInput: ChartModel;

  @Input()
  additionalInfo: any;

  chartOptions: ChartOptions = {
    responsive: true
  };
  chartData: ChartDataSets | ch.SingleDataSet | ChartDataSets[];
  chartLabels: ch.Label[];
  chartType: string;
  chartLegend: boolean | null;
  chartColors: ch.Color[] | null;
  chartPlugins: ch.PluginServiceGlobalRegistrationAndOptions[];

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'chartInput': {
            this.chartData = this.chartInput.dataset;
            this.chartLabels = this.chartInput.labels;
            this.chartLegend = this.chartInput.legend;
            this.chartColors = this.chartInput.color;
            this.chartType = this.chartInput.type;

            if (this.chartType === 'doughnut') {
              let sum = this.additionalInfo.sum;

              this.chartPlugins = [{
                beforeDraw(chart: any) {
                  const ctx = chart.ctx;
                  const txt = `${sum.toFixed(1)}`;

                  //Get options from the center object in options
                  const sidePadding = 60;
                  const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)

                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'middle';
                  const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
                  const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);

                  //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                  const stringWidth = ctx.measureText(txt).width;
                  const elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

                  // Find out how much the font can grow in width.
                  const widthRatio = elementWidth / stringWidth;
                  const newFontSize = Math.floor(30 * widthRatio);
                  const elementHeight = (chart.innerRadius * 2);

                  // Pick a new font size so it will not be larger than the height of label.
                  const fontSizeToUse = Math.min(newFontSize, elementHeight);

                  ctx.font = fontSizeToUse + 'px Arial';
                  ctx.fillStyle = 'black';

                  // Draw text in center
                  ctx.fillText(txt, centerX, centerY);
                }
              }];
            }
            break;
          }
        }
      }
    }
  }
}
