import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
//import * as bcrypt from 'bcrypt'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const hashPassword = async (password: string) => {
  //const hashedPassword = await bcrypt.hash(password, 12)
   //return hashedPassword;
}


export const getAbbreviation = (name: string) => {
  const splittedName = name.split(" ")
  let abrreviatedName = ""
  splittedName.map(name => {
    abrreviatedName += name.split("")[0]
  })
  return abrreviatedName

}