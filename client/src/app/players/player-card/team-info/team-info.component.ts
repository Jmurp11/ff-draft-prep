import { Component, Input, OnInit } from '@angular/core';
import { Team } from '../../../sdk/generated/graphql';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss']
})
export class TeamInfoComponent implements OnInit {

  @Input()
  team: Team;

  constructor() { }

  ngOnInit(): void {
  }

}
