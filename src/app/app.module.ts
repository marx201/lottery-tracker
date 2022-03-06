import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BackgroundComponent } from './component/background/background.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import { TrackerComponent } from './component/tracker/tracker.component';
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { HistoryComponent } from './component/history/history.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { DialogEntryComponent } from './component/dialog-entry/dialog-entry.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {AngularFireModule} from "@angular/fire/compat";
import {PieChartModule} from "@swimlane/ngx-charts";

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    TrackerComponent,
    HistoryComponent,
    DialogEntryComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        AngularFireModule.initializeApp(environment.firebase),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        MatDialogModule,
        MatInputModule,
        MatSortModule,
        MatTableModule,
        PieChartModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
