import {Component, OnInit} from '@angular/core';
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {ThemePalette} from "@angular/material/core";
import {FirestoreService} from "../../service/firestore.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogEntryComponent} from "../dialog-entry/dialog-entry.component";
import {Entry, Summary} from "../../model/entry.model";
import {TrackerService} from "../../service/tracker.service";

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {


  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  entries: Entry[] = [];

  summary: Summary = {
    total: 0,
    totalCost: 0,
    totalEarning: 0
  }

  constructor(
    public dialog: MatDialog,
    private firestoreService: FirestoreService,
    private trackerService: TrackerService) {
  }

  ngOnInit(): void {
    this.firestoreService.getEntries().subscribe((entries: Entry[]) => {
      this.entries = entries;
      this.trackerService.calculateSummary(entries).then(summary => {
        console.log(summary, "Summary");
        this.summary = summary;
      })
    })


  }

  enterResult(): void {
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
        })
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: any) {
    const entry = {
      cost: row_obj.name,
      earning: row_obj.category,
      created: Date.now()
    }
    this.firestoreService.addEntry(entry).then(value => {
      console.log("Successfully added entry: ", value);
      this.entries.push(entry);
    })
  }

  updateRowData(row_obj: any) {
    this.entries = this.entries.filter((value, key) => {
      if (value.id == row_obj.id) {
        value.cost = row_obj.cost;
        value.earning = row_obj.earning;
        value.created = row_obj.created;
      }
      this.firestoreService.updateEntry(value).then(value1 => {
        console.log("successfully updated");
        return true;
      })
    });
  }

  deleteRowData(row_obj: any) {
    this.entries = this.entries.filter((entryToRemove, key) => {
      if (entryToRemove.id === row_obj.id) {
        this.firestoreService.deleteEntry(entryToRemove).then(value => {
          console.log("Succesfully deleted, ", value);
        })
      }
      return entryToRemove.id != row_obj.id;
    });
  }

}
