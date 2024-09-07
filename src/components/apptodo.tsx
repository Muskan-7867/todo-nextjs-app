"use client";

import { useState } from "react";

type TodoForm = {
  task: string;
  status: string;
  targetTime: string;
};

const AddTodo = () => {
  const [form, setForm] = useState<TodoForm>({
    task: "",
    status: "",
    targetTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/create/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create Todo");
      }

      setSuccessMessage("Todo created successfully!");
      setForm({ task: "", status: "pending", targetTime: "" });
    } catch (error: any) {
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-todo-container">
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-group">
          <label htmlFor="task">Task:</label>
          <input
            type="text"
            id="task"
            name="task"
            value={form.task}
            onChange={handleChange}
            required
            placeholder="Enter your task"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            required
            placeholder="Enter status (e.g., pending, completed)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="targetTime">Target Time:</label>
          <input
            type="datetime-local"
            id="targetTime"
            name="targetTime"
            value={form.targetTime}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Add Todo"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default AddTodo;
