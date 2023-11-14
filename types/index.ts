export type User = {
  _id?: string
  name: string
  email: string
  password: string
  createdAt?: Date,
  updatedAt?: Date
}

export type Employee = {
  _id?: string,
  name: string,
  email: string,
  birthDate: string
  contact: string
  address: string
  position: string
  department: string
  hireDate: Date
  manager:  Boolean
  salary: string
  createdAt?: Date,
  updatedAt?: Date
} 