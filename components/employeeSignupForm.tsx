"use client";
import React, { useState } from "react";
import { Button, Input, Label } from "./ui";
import { cn } from "@/lib/utils";
import { useGlobalContext } from "@/context/storei";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { sendDataToDBI } from "@/services";
import Employee from "@/app/(models)/empolyees";


interface EmployeeSignupFormProps extends React.HTMLAttributes<HTMLDivElement> {}

// const createUser = aysnc( email, password) => {
//   const response = await fetch('api/auth/signup',{
//     method:'POST',
//     body: JSON.stringify({ email, password}),
//     headers:{
//       'Content-type': 'application/json'
//     }
//   })

//   if(!response.ok){
//     throw new Error(data.message || "something went wrong!")
//   }

//   return data;
// }

const EmployeeSignupForm = ({ className, ...props }: EmployeeSignupFormProps) => {
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [manager, setManager] = useState(false);
  const [salary, setSalary] = useState("");
  
  const router = useRouter();

  let { employees, setEmployees } = useGlobalContext();

  const comparePasswords = (myPassword: string) => {
    return password === confirmPassword;
  };

  const handlefirstnameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setFirstname(event.target.value);
  };
  const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSurname(event.target.value);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setConfirmPassword(event.target.value);
  };
  
  const handleContactChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) =>{
    setContact(event.target.value);
  }

  const handleAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) =>{
    setAddress(event.target.value);
  }

  const handleBirthDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) =>{
    setBirthDate(event.target.value);
  }

  const handlePositionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) =>{
    setPosition(event.target.value);
  }

  const handleDepartmentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) =>{
    setDepartment(event.target.value);
  }

  const handleHireDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) =>{
    setHireDate(event.target.value);
  }

  const handleManagerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) =>{
    setManager(event.target.checked);
  }

  const handleSalaryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) =>{
    setSalary(event.target.value);
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // comparePasswords(password);
    event.preventDefault();
    if (comparePasswords(password)) {
      const newEmployee = { name: `${firstname} ${surname}`, email, password, contact, address, position,department, hireDate, manager, salary };
      // setUsers([...users, newUser]);
      const data = await sendDataToDBI(newEmployee);
      if (true) {
        router.refresh();
        router.push("/");
        toast.success("Employee signed up successfully");
      }
    } else {
      toast.error("Passwords dont match");
    }
    setFirstname("");
    setSurname("");
    setEmail("");
    setContact("");
    setAddress("");
    setPosition("");
    setDepartment("");
    setHireDate("");
    setManager(false);
    setSalary("")
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="firstname"
              type="text"
              value={firstname}
              onChange={handlefirstnameChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="text">
              Surname
            </Label>
            <Input
              id="surname"
              placeholder="surname"
              type="text"
              value={surname}
              onChange={handleSurnameChange}
            />
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              value={email}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              onChange={handleEmailChange}
            />
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="text">
              BirthDate
            </Label>
            <Input
              id="birthDate"
              placeholder="date of birth"
              type="date"
              value={birthDate}
              onChange={handleBirthDateChange}
            />
          </div>
          
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="text">
              Contact
            </Label>
            <Input
              id="contact"
              placeholder="contact"
              type="text"
              value={contact}
              onChange={handleContactChange}
            />
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="text">
              Address
            </Label>
            <Input
              id="address"
              placeholder="address"
              type="text"
              value={address}
              onChange={handleAddressChange}
            />
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="text">
              Position
            </Label>
            <Input
              id="position"
              placeholder="position"
              type="text"
              value={position}
              onChange={handlePositionChange}
            />
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="text">
              Department
            </Label>
            <Input
              id="department"
              placeholder="department"
              type="text"
              value={department}
              onChange={handleDepartmentChange}
            />
          </div>

          <div className="grid gap-1">
            <Label className="" htmlFor="text">
              Hire Date
            </Label>
            <Input
              id="hireDate"
              placeholder="hireDate"
              type="date"
              value={hireDate}
              onChange={handleHireDateChange}
            />
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="text">
              Salary
            </Label>
            <Input
              id="salary"
              placeholder="salary"
              type="text"
              value={salary}
              onChange={handleSalaryChange}
            />
          </div>

          <div className="grid gap-1">
            <Label className="" htmlFor="text">
              active
            </Label>
            <Input
              id="manager"
              placeholder="manager"
              type="checkbox"
              checked={manager}
              onChange={handleManagerChange}
            />
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              value={password}
              id="password"
              type="password"
              placeholder="password"
              onChange={handlePasswordChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="confirmPassword">
              Confirm Password
            </Label>
            <Input
              value={confirmPassword}
              placeholder="confirm password"
              id="confirmPassword"
              type="Password"
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <Button>Sign up</Button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeSignupForm;
