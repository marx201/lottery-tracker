import {Component, OnInit} from '@angular/core';
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {

  amount: number = 25;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';

  constructor() {
  }

  ngOnInit(): void {
  }

  clickWin():void{
    console.log("Clicked win");
    this.amount +=25;
  }
  clickLose():void{
    console.log("Clicked Lose");
    this.amount -=25;
  }

}
