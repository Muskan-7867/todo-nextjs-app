"use client";

import { useState, useEffect } from "react";


type Todo = {
  id: string;
  task: string;
  status: string;
  targetTime: string;
};

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/todos", {
          method: "GET",
        });

        // Handle cases where the response is empty
        const text = await response.text();
        const data = text ? JSON.parse(text) : { payload: [] };

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch todos");
        }

        if (!Array.isArray(data.payload)) {
          throw new Error("Invalid data structure received from the server.");
        }

        setTodos(data.payload);
      } catch (error: any) {
        console.error("Error fetching todos:", error);
        setError(error.message || "An error occurred while fetching todos.");
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span>{todo.task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
