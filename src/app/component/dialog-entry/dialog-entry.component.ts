import {Component, Inject, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Entry} from "../../model/entry.model";


@Component({
  selector: 'app-dialog-entry',
  templateUrl: './dialog-entry.component.html',
  styleUrls: ['./dialog-entry.component.scss']
})
export class DialogEntryComponent {

  action: string;
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<DialogEntryComponent>,

    @Optional() @Inject(MAT_DIALOG_DATA) public data: Entry) {
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.local_data});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }


}
