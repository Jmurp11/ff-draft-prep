import { SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../../sdk/generated/graphql';

@Component({
  selector: 'app-projection-data',
  templateUrl: './projection-data.component.html',
  styleUrls: ['./projection-data.component.scss']
})
export class ProjectionDataComponent implements OnInit {

  @Input()
  player: Player;

  constructor() { }

  ngOnInit(): void {
  }
}
