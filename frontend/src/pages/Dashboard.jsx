import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [editTitle, setEditTitle] =
    useState("");

  const [
    editDescription,
    setEditDescription
  ] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] =
    useState("");

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");

      setTasks(
        res.data.tasks || res.data
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load tasks"
      );
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    try {
      await api.post("/tasks", {
        title,
        description
      });

      setMessage(
        "Task created successfully"
      );

      setError("");

      setTitle("");
      setDescription("");

      fetchTasks();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create task"
      );
    }
  };

  const updateTask = async (id) => {
    try {
      await api.put(
        `/tasks/${id}`,
        {
          title: editTitle,
          description:
            editDescription,
          completed:
            tasks.find(
              (t) => t.id === id
            )?.completed
        }
      );

      setEditingId(null);

      setMessage(
        "Task updated successfully"
      );

      fetchTasks();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update task"
      );
    }
  };

  const toggleTask = async (task) => {
    try {
      await api.put(
        `/tasks/${task.id}`,
        {
          title: task.title,
          description:
            task.description,
          completed:
            !task.completed
        }
      );

      fetchTasks();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update task"
      );
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(
        `/tasks/${id}`
      );

      setMessage(
        "Task deleted successfully"
      );

      fetchTasks();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to delete task"
      );
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="dashboard-header">
        <h2>Task Dashboard</h2>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {message && (
        <div className="success">
          {message}
        </div>
      )}

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      <div className="task-card">
        <div className="form-group">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
          />
        </div>

        <div className="form-group">
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            rows="3"
          />
        </div>

        <button
          className="btn"
          onClick={createTask}
        >
          Add Task
        </button>
      </div>

      <br />

      {tasks.length === 0 ? (
        <div className="task-card">
          No tasks found
        </div>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className="task-card"
          >
            {editingId ===
            task.id ? (
              <>
                <div className="form-group">
                  <input
                    value={editTitle}
                    onChange={(e) =>
                      setEditTitle(
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="form-group">
                  <textarea
                    rows="3"
                    value={
                      editDescription
                    }
                    onChange={(e) =>
                      setEditDescription(
                        e.target
                          .value
                      )
                    }
                  />
                </div>
              </>
            ) : (
              <>
                <div className="task-header">
                  <div
                    className={
                      task.completed
                        ? "task-title task-completed"
                        : "task-title"
                    }
                  >
                    {task.title}
                  </div>

                  <input
                    type="checkbox"
                    checked={
                      task.completed
                    }
                    onChange={() =>
                      toggleTask(
                        task
                      )
                    }
                  />
                </div>

                <div className="task-description">
                  {
                    task.description
                  }
                </div>
              </>
            )}

            <div className="task-actions">
              {editingId ===
              task.id ? (
                <>
                  <button
                    className="btn"
                    onClick={() =>
                      updateTask(
                        task.id
                      )
                    }
                  >
                    Save
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      setEditingId(
                        null
                      )
                    }
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditingId(
                        task.id
                      );

                      setEditTitle(
                        task.title
                      );

                      setEditDescription(
                        task.description ||
                          ""
                      );
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteTask(
                        task.id
                      )
                    }
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}