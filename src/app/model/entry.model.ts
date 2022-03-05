export interface Entry {
  id?: number,
  created: number,
  cost: number,
  earning: number
}

export interface Summary {
  total: number,
  totalCost: number,
  totalEarning: number
}
