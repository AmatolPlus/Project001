export interface IJoinEvent {
  thresholdOccupancy: number;
  currentOccupancy: number;
  joinEndDate: string;
  entryFee: string | number;
  contestName: string;
  joinStartDate: string;
  onJoinEvent: () => void;
}
