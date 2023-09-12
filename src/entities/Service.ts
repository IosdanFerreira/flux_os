export interface IService {
  id:number;
  name: string;           
  price: number;
  description: string | null;
  estimated_time: string;
  user_id: number;
}