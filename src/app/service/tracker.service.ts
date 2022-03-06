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
        totalEarning: 0,
        totalEarningPercentage: 0
      }
      entries.forEach(value => {
        summaryObj.totalEarning = +summaryObj.totalEarning + +value.earning;
        summaryObj.totalCost = +summaryObj.totalCost + +value.cost
      })
      summaryObj.total = +summaryObj.totalEarning - +summaryObj.totalCost;
      if (this.hasNoEarning(summaryObj.totalCost, summaryObj.totalEarning)) {
        console.log("No Earning.");
        summaryObj.totalEarningPercentage = 0;
      } else {
        summaryObj.totalEarningPercentage = (+summaryObj.totalEarning * 100) / +summaryObj.totalCost;
      }
      resolve(summaryObj);
    })
  }


  private hasNoEarning(totalCost: number, totalEarning: number) {
    return +totalCost >= +totalEarning;
  }
}
