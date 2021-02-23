import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Chart } from '../../../../ui/chart/chart.model';

@Component({
  selector: 'app-detail-pop-up',
  templateUrl: './detail-pop-up.component.html',
  styleUrls: ['./detail-pop-up.component.scss']
})
export class DetailPopUpComponent implements OnInit {
  title: string;
  chart: Chart;

  constructor(
    @Inject(MAT_DIALOG_DATA) public input: any,
    public dialogRef: MatDialogRef<DetailPopUpComponent>
  ) { }

  ngOnInit(): void { }

}
