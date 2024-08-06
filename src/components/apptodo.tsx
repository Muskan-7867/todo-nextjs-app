"use client"
import  { ChangeEvent, FormEvent, useState } from "react";
import { usetodos } from "../store/todos";

const Apptodo = () => {
  const [todo, settodo] = useState("");
  const {handleAddTodo} = usetodos()
  const handleformsubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    handleAddTodo(todo);
    settodo('')
  };
return (
  <>
    <form onSubmit={handleformsubmit}>
      <input
        type="text"
        value={todo}
        onChange={(event:ChangeEvent<HTMLInputElement>) => settodo(event.target.value)}
      ></input>

      <button type="submit">Add</button>
    </form>

    




</>
  );
};

export default Apptodo;
    