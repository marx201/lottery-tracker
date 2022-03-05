export interface Entry {
  id?: number,
  created: Date,
  cost: number,
  earning: number
}

export interface Summary {
  total: number,
  totalBought: number,
  totalEarning: number
}
