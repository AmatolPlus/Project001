export interface IJoinEvent {
  thresholdOccupancy: number;
  currentOccupancy: number;
  joinEndDate: string;
  mobile_number: string;
  entryFee: string | number;
  contestName: string;
  started_on: string;
  onJoinEvent: any;
  is_free: boolean;
}
