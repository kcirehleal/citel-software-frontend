import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {

  @Input() chartData: any;
  charts: Map<string, Chart> = new Map();

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartData'] && this.chartData) {
      this.updateCharts();
    }
  }

  updateCharts() {

    this.createChartDefault('donorsStatisticsByState', 'Quantidade de doares por Estado', this.chartData.donorsStatisticsByStateDto, 'state', 'donors_qtt');
    this.createChartDefault('averageIMCStatictsByAgeGroup', 'IMC médio por faixa de idade', this.chartData.averageIMCStatictsByAgeGroupDto, 'age_group', 'average_imc');
    this.createChartObesePeople('percentageObesePeopleStatistics', this.chartData.percentageObesePeopleStatisticsDto);
    this.createChartDefault('averageAgeStatictsByTypeBlood', 'Média de idade por tipo sanguíneo', this.chartData.averageAgeStatictsByTypeBloodDto, 'blood_type', 'average_age');
    this.createChartDefault('suitableDonorsStatictsByTypeBlood', 'Potenciais doadores por tipo sanguíneo receptor', this.chartData.suitableDonorsStatictsByTypeBloodDto, 'blood_type', 'qtt_possible_donors');

  }

  createChartDefault(chartId: string, dataSetLabel: string, dataArray: any[], labelProperty: string, dataProperty: string) {
    if (this.charts.has(chartId)) {
      this.charts.get(chartId)?.destroy();
    }

    const canvas = document.getElementById(chartId) as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const config: any = {
          type: 'bar',
          data: {
            labels: dataArray.map(item => item[labelProperty]),
            datasets: [
              {
                label: dataSetLabel,
                data: dataArray.map(item => item[dataProperty]),
                backgroundColor: '#87CEFA',
                borderColor: '#6495ED',
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          },
        };

        const chart = new Chart(ctx, config);
        this.charts.set(chartId, chart);
      }
    }
  }

  createChartObesePeople(chartId: string, dataArray: any[]) {
    if (this.charts.has(chartId)) {
      this.charts.get(chartId)?.destroy();
    }

    const canvas = document.getElementById(chartId) as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const config: any = {
          type: 'bar',
          data: {
            labels: ['Total', 'Quantidade de Obesos', 'Percentual de Obesidade'],
            datasets: [
              {
                label: 'Mulheres',
                data: [dataArray[0]?.total_count, dataArray[0]?.obese_count, dataArray[0]?.obesity_percentage],
                backgroundColor: '#87CEFA',
                borderColor: '#6495ED',
                borderWidth: 1
              },
              {
                label: 'Homens',
                data: [dataArray[1]?.total_count, dataArray[1]?.obese_count, dataArray[1]?.obesity_percentage],
                backgroundColor: '#F08080',
                borderColor: '#FF6347',
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          },
        };

        const chart = new Chart(ctx, config);
        this.charts.set(chartId, chart);
      }
    }
  }
}
