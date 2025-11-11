export interface Rateplan {
  id: number;
  code: string;
}

export interface Room {
  id: number;
  name: string;
  description: string;
  active: boolean;
  rateplans: Rateplan[];
}

export interface Hotel {
  id: number;
  name: string;
  address: string;
  rooms: Room[];
}
