import { ChartDataSets } from "chart.js";

export interface Chart {
  type: string;
  dataset: number[] | ChartDataSets[];
  labels: string[];
  legend: boolean | null;
  color: Color[] | null;
}

interface Color {
  borderColor: string | null;
  backgroundColor: string | null;
}
