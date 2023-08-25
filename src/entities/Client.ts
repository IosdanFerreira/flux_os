export interface IClient {
  id: number;
  name: string;
  surname?: string | null;
  email: string;
  phone?: string | null;
  cpf: string;
  rg?: string | null;
  gender: string;
  cep: string;
  street: string;
  number_house?: string | null;
  neighborhood?: string | null;
  state?: string | null;
  city?: string | null;

  user_id: number;
}