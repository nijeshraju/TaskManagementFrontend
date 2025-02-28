import React, { useEffect, useState } from "react";
import axios from "axios";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:8080/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:8080/api/tasks",
      { title, description },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    fetchTasks();
  };

  const handleUpdateStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:8080/api/tasks/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    fetchTasks();
  };

  return (
    <div className="task_outer">
      <div className="task_container">
        <h2>Task Management</h2>
        <form onSubmit={handleAddTask} className="task_form">
          <div className="add_task">
            <h3>Add Task</h3>
            <div className="form_container">
              <div className="form_group">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form_group">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="task_btn_submit">
                Add Task
              </button>
            </div>
          </div>
        </form>

        <div className="task_listing">
          <h3>Tasks List</h3>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <strong>{task.title}</strong>
                  </td>
                  <td>{task.description}</td>
                  <td>
                    <select
                      className="status_select"
                      value={task.status}
                      onChange={(e) =>
                        handleUpdateStatus(task.id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="InProgress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
