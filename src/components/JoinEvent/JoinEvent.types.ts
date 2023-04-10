export interface IJoinEvent {
  thresholdOccupancy: number;
  currentOccupancy: number;
  joinEndDate: string;
  joinStartDate: string;
  onJoinEvent: () => void;
}
