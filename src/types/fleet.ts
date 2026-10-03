export type VehicleStatus = "active" | "maintenance" | "inactive";

export interface Vehicle {
  id: string;
  fleetNumber: string;
  name: string;
  model: string;
  category: "6_seater" | "7_seater" | "9_seater" | "13_seater" | "wheelchair" | "luxury_sedan";
  plateNumber: string;
  paxCapacity: number;
  luggageCapacity: number;
  baseRate: number;
  hourlyRate: number;
  status: VehicleStatus;
  driverName: string;
  driverPhone: string;
  features: string[];
  imageUrl?: string;
  imagePath?: string;
  lastServiceDate?: string;
}
