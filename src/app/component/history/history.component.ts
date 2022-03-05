import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Entry} from "../../model/entry.model";
import {MatTableDataSource, MatTable} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {FirestoreService} from "../../service/firestore.service";
import {DialogEntryComponent} from "../dialog-entry/dialog-entry.component";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, AfterViewInit  {

  entries: Entry[] = [];
  addButtonTitle = "Add";
  displayedColumns: string[] = ['created', 'cost', 'earning'];
  tableHeaderRowColor = "#3f51b5";
  dataSource = new MatTableDataSource();
  // @ts-ignore
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild('sortEntries') sortEntries = new MatSort();


  constructor(
    public dialog: MatDialog,
    private firestoreService: FirestoreService) {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sortEntries;
  }

  ngOnInit(): void {
    this.firestoreService.getEntries().subscribe((entries: Entry[]) => {
      this.entries = entries;
      this.dataSource.data = entries;
    })
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogEntryComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
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
      created: new Date()
    }
    this.firestoreService.addEntry(entry).then(value => {
      console.log("Successfully added entry: ", value);
      this.entries.push(entry);
      this.table.renderRows();
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
