export type User = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  contact: string;
  address: string;
  position: string;
  department: string;
  manager: boolean;
  salary: string
  birthDate?: Date;
  hireDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}