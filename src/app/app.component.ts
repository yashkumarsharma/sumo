import { Component } from '@angular/core';

import { AppService } from './app.service';
import { Team } from './team.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  teams: Team[];
  teamSuggestionOpen = false;
  employeeSuggestionOpen = false;
  teamInputFocus = false;
  employeeInputFocus = false;
  teamSelected: string;
  employeeSelected: string;
  suggestedTeams: string[];
  suggestedEmployees: string[];
  employeesOfSelectedTeam: string[] = [];

  constructor(private appService: AppService) {
    this.teams = this.appService.getTeams();
  }

  onTeamInputKeyup(): void {
    this.teamSelected = this.teamSelected.toLowerCase();
    if (this.teamSelected.length < 1) {
      this.teamSuggestionOpen = false;
      return;
    }
    this.employeesOfSelectedTeam = [];
    this.employeeSelected = '';
    this.suggestedTeams = this.teams
    .filter(x => x.team.toLowerCase().indexOf(this.teamSelected) >= 0)
    .map(x => x.team);
    this.teamSuggestionOpen = this.suggestedTeams.length ? true : false;
  }

  selectTeam(team: string): void {
    this.teamSelected = team;
    this.teamSuggestionOpen = false;
    this.employeesOfSelectedTeam = this.teams.find(x => x.team === this.teamSelected).employees;
    this.employeeSelected = '';
  }

  onEmployeeInputKeyup(): void {
    this.employeeSelected = this.employeeSelected.toLowerCase();
    if (this.employeeSelected.length < 1 || this.employeesOfSelectedTeam.length <= 0) {
      this.employeeSuggestionOpen = false;
      return;
    }
    this.suggestedEmployees = this.employeesOfSelectedTeam
    .filter(x => x.toLowerCase().indexOf(this.employeeSelected) >= 0);
    this.employeeSuggestionOpen = this.suggestedEmployees.length ? true : false;
  }

  selectEmployee(employee: string): void {
    this.employeeSelected = employee;
    this.employeeSuggestionOpen = false;
  }

}
