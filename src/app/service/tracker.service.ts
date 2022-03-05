import {Injectable} from '@angular/core';
import {Entry, Summary} from "../model/entry.model";

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  constructor() {
  }

  public calculateSummary(entries: Entry[]): Promise<Summary> {
    return new Promise<Summary>((resolve, reject) => {
      let summaryObj = {
        total: 0,
        totalCost: 0,
        totalEarning: 0
      }
      entries.forEach(value => {
        summaryObj.totalEarning = +summaryObj.totalEarning + +value.earning;
        summaryObj.totalCost = +summaryObj.totalCost + +value.cost
      })

      summaryObj.total = +summaryObj.totalEarning - +summaryObj.totalCost;
      resolve(summaryObj);
    })
  }

}
