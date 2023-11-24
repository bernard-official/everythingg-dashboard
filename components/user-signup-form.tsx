"use client";
import React, { FormEvent, useState } from "react";
import { Button, Checkbox, Input, Label } from "./ui";
import { cn } from "@/lib/utils";
import { useGlobalContext } from "@/context/store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { sendDataToDB } from "@/services";

interface UserSignupFormProps extends React.HTMLAttributes<HTMLDivElement> {}

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

const UserSignupForm = ({ className, ...props }: UserSignupFormProps) => {
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

  let { users, setUsers } = useGlobalContext();

  const comparePasswords = () => {
    return password === confirmPassword;
  };

  const handleFirstNameChange = (
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

  const handleContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContact(event.target.value);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleBirthDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBirthDate(event.target.value);
  };

  const handlePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(event.target.value);
  };

  const handleDepartmentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDepartment(event.target.value);
  };

  const handleHireDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHireDate(event.target.value);
  };

  const handleManagerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setManager((value) => !value);
  };

  const handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSalary(event.target.value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // comparePasswords(password);
    event.preventDefault();
    if (comparePasswords()) {
      const newUser = {
        name: `${firstname} ${surname}`,
        email,
        password,
        contact,
        address,
        position,
        department,
        birthDate: new Date(birthDate),
        hireDate: new Date(hireDate),
        manager,
        salary,
      };
      // setUsers([...users, newUser]);
      const data = await sendDataToDB(newUser);
      if (data.status === 201) {
        router.refresh();
        router.push("/admin");
        toast.success("User signed up successfully");
      } else {
        toast.error("Server error");
      }
    } else {
      toast.error("Passwords dont match");
    }
    setFirstname("");
    setSurname("");
    setEmail("");
    setContact("");
    setBirthDate("");
    setAddress("");
    setPosition("");
    setDepartment("");
    setHireDate("");
    setManager(false);
    setSalary("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <form
      className="flex flex-col space-y-4 items-center justify-center mx-auto w-[40%]"
      onSubmit={onSubmit}
    >
      <div className="flex space-x-10  w-[90%] px-4 py-2 items-center justify-center">
        <div>
          <Label htmlFor="email">First Name</Label>
          <Input value={firstname} onInput={handleFirstNameChange} />
        </div>
        <div>
          <Label>Surname</Label>
          <Input value={surname} onChange={handleSurnameChange} />
        </div>
      </div>

      <div className="flex space-x-10  w-[90%] px-4 py-2 items-center justify-center">
        <div>
          <Label>Address</Label>
          <Input value={address} onChange={handleAddressChange} />
        </div>
        <div>
          <Label>Contact</Label>
          <Input value={contact} onChange={handleContactChange} />
        </div>
      </div>

      <div className="flex space-x-10  w-[90%] px-4 py-2 items-center justify-center">
        <div>
          <Label>Position</Label>
          <Input value={position} onChange={handlePositionChange} />
        </div>

        <div>
          <Label>Department</Label>
          <Input value={department} onChange={handleDepartmentChange} />
        </div>
      </div>

      <div className="flex space-x-10  w-[90%] px-4 py-2 items-center justify-center">
        <div>
          <Label>Salary</Label>
          <Input value={salary} onChange={handleSalaryChange} />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="user@gmail.com"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
      </div>

      <div className="flex space-x-10 w-[90%] px-4 py-2 items-center justify-center">
        <div>
          <Label>Password</Label>
          <Input
            value={password}
            type="password"
            placeholder="password"
            onChange={handlePasswordChange}
          />
        </div>

        <div>
          <Label>Confirm Password</Label>
          <Input
            value={confirmPassword}
            id="confirmPassword"
            type="password"
            onChange={handleConfirmPasswordChange}
          />
        </div>
      </div>

      <div className="flex space-x-10 w-[90%] px-4 py-2 items-center justify-center">
        <div className="w-1/2">
          <Label className="flex text-gray-500">BirthDate</Label>
          <Input
            type="date"
            value={birthDate}
            onChange={handleBirthDateChange}
          />
        </div>

        <div className="w-1/2">
          <Label className=" text-gray-500">Hire Date</Label>
          <Input type="date" value={hireDate} onChange={handleHireDateChange} />
        </div>
      </div>

      <div className="flex justify-center items-center space-x-10">
        <div className=" flex items-center justify-center space-x-2 w-1/2">
          <input
            type="checkbox"
            id="manager"
            className="accent-[#272e3f] hover:cursor-pointer rounded-md peer h-4 w-4 shrink-0 border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            checked={manager}
            onChange={handleManagerChange}
          />
          <label
            htmlFor="manager"
            className="hover:cursor-pointer text-gray-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Is Manager
          </label>
        </div>
        <Button className="w-32 rounded-none">Sign up</Button>
      </div>
    </form>
  );
};

export default UserSignupForm;
