export interface IVehicle {
  id: number;
  make: string;
  model: string;
  plate: string;
  color: string;
  comments: string | null;
  client_id: number
  user_id: number
}