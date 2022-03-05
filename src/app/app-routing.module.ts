import {NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {HistoryComponent} from './component/history/history.component';
import {TrackerComponent} from "./component/tracker/tracker.component";

const routes: Routes = [
  {path: 'tracker', component: TrackerComponent},
  {path: '', redirectTo: '/tracker', pathMatch: 'full'},
  {path: 'history', component: HistoryComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
