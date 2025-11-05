export interface User {
  id: string;
  type: 'USER' | 'CONSULTANT';
  name: string;
  phone: string;
  email: string;
  age: number;
  cpf: string;
  cep: string;
  state: string;
  address: string;
  addressComplement?: string;
  consultantId?: string;
  consultant?: User;
  clients?: User[];
  createdAt: Date;
  updatedAt: Date;
}