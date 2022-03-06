import {Component, OnInit} from '@angular/core';
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {ThemePalette} from "@angular/material/core";
import {FirestoreService} from "../../service/firestore.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogEntryComponent} from "../dialog-entry/dialog-entry.component";
import {Entry, Summary} from "../../model/entry.model";
import {TrackerService} from "../../service/tracker.service";
import {Color, LegendPosition, ScaleType} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {


  // @ts-ignore
  chartElements = [
    {
      "name": "Expenses",
      "value": 0
    },
    {
      "name": "Earnings",
      "value": 0
    }
  ];


  view = [700, 400];
  // options
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = false;
  isDoughnut: boolean = true;
  legendPosition = LegendPosition.Below;
  hasEarning = false;
  colorScheme: Color = {
    group: ScaleType.Linear, name: "test", selectable: true,
    domain: ['#A10A28', '#5AA454']
  };

  showChart = false;
  entries: Entry[] = [];

  summary: Summary = {
    total: 0,
    totalCost: 0,
    totalEarning: 0,
    totalEarningPercentage: 0
  }

  constructor(
    public dialog: MatDialog,
    private firestoreService: FirestoreService,
    private trackerService: TrackerService) {
  }

  ngOnInit(): void {
    this.firestoreService.getEntries().subscribe((entries: Entry[]) => {
      this.entries = entries;
      this.calculateSummaryAndSetChart(entries);
    })


  }

  private calculateSummaryAndSetChart(entries: Entry[]): void {
    this.trackerService.calculateSummary(entries).then(summary => {
      console.log(summary, "Summary");
      this.summary = summary;
      if (summary.totalCost >= summary.totalEarning) {
        this.chartElements[1].value = 0;
      } else {
        this.chartElements[1].value = this.summary.totalEarning;
      }
      this.chartElements[0].value = this.summary.totalCost;

      console.log("chartelement 0",this.chartElements[0].value);
      console.log("chartelement 1",this.chartElements[1].value);

      setTimeout(() => {
        this.showChart = true;
      }, 300);
      this.hasEarning = this.getEarning();
    })
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  enterResult(): void {
    this.showChart = false;
    this.openDialog('Add', {})
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogEntryComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {

        const entry = {
          cost: result.data.cost,
          earning: result.data.earning,
          created: Date.now()
        }
        this.firestoreService.addEntry(entry).then(value => {
          console.log("Successfully added entry: ", value);
          this.entries.push(entry);
          this.calculateSummaryAndSetChart(this.entries)
        })
      } else{
        this.showChart = true;
      }

    });
  }
public getEarning(): boolean{
    return this.summary.totalEarning > this.summary.totalCost;
}
}
