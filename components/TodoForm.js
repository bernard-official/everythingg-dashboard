"use client";
import React, { useState } from "react";
import { Button, Input, Label } from "./ui";
import { useRouter } from "next/navigation";


const TodoForm = ({ addTodo: string }) => {
  const [ value, setValue] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    addTodo(value);

    setValue("")
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            
            <Input
              id="text"
              type="text"
              value = {value}
              onChange={(e)=> setValue(e.target.value)}
              placeholder="assign tasks to colleges"
              className="flex justify-center items-center"
            />
          </div>
          <div className="flex w-33 justify-center items-center">
          <Button >Add Task</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
