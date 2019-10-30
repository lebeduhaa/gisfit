export interface GoogleFit {
  dataSourceId?: string;
  point?: Point[];
}

export interface Point {
  startTimeNanos?: number;
  endTimeNanos?: number;
  dataTypeName?: string;
  originDataSourceId?: string;
  value?: {
    fpVal?: number;
    intVal?: number;
    mapVal?: any[];
  }[];
}
