"use client";

import { useState, useEffect } from "react";

type Todo = {
  _id: string;
  task: string;
  status: string;
  targetTime: string;
};

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null); 
  const [editingTask, setEditingTask] = useState<string>(""); 
  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todos", { method: "GET" });
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

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/delete/todo`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const result = await response.json();
          throw new Error(result.message || "Failed to delete todo");
        } else {
          throw new Error("Unexpected response from the server.");
        }
      }

      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));

      await fetchTodos();
    } catch (error: any) {
      console.error("Error deleting todo:", error);
      setError(error.message || "An error occurred while deleting the todo.");
    }
  };

  const handleUpdate = async (id: string, updatedFields: Partial<Todo>) => {
    try {
      const response = await fetch(`/api/update/todo`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...updatedFields }),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const result = await response.json();
          throw new Error(result.message || "Failed to update todo");
        } else {
          throw new Error("Unexpected response from the server.");
        }
      }

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, ...updatedFields } : todo
        )
      );

      setEditingId(null);
      setEditingTask("");

      
      await fetchTodos();
    } catch (error: any) {
      console.error("Error updating todo:", error);
      setError(error.message || "An error occurred while updating the todo.");
    }
  };

  
  const handleDoubleClick = (id: string, currentTask: string) => {
    setEditingId(id);
    setEditingTask(currentTask);
  };

 
  const handleEditComplete = async (id: string) => {
    if (editingTask.trim()) {
      await handleUpdate(id, { task: editingTask });
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      {error && <p>{error}</p>}
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {editingId === todo._id ? (
              <input
                type="text"
                value={editingTask}
                onChange={(e) => setEditingTask(e.target.value)}
                onBlur={() => handleEditComplete(todo._id)} 
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleEditComplete(todo._id); 
                }}
                autoFocus
              />
            ) : (
              <span onDoubleClick={() => handleDoubleClick(todo._id, todo.task)}>
                {todo.task}
              </span>
            )}
            <button
              onClick={() => handleDelete(todo._id)}
              className="border-2 px-2 bg-red-200 text-black"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
