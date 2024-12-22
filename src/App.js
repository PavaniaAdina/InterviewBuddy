import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setTask(tasks[index]);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  const updateTask = () => {
    if (task.trim()) {
      const updatedTasks = tasks.map((t, index) =>
        index === currentTaskIndex ? task : t
      );
      setTasks(updatedTasks);
      setTask("");
      setIsEditing(false);
      setCurrentTaskIndex(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      isEditing ? updateTask() : addTask();
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">To-Do App </h1>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Add or edit a task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyPress={handleKeyPress} // Trigger on Enter
            />
            {isEditing ? (
              <button className="btn btn-success" onClick={updateTask}>
                Update
              </button>
            ) : (
              <button className="btn btn-primary" onClick={addTask}>
                Add
              </button>
            )}
          </div>
          {tasks.length === 0 ? (
            <p className="text-center text-muted">No tasks to display</p>
          ) : (
            <ul className="list-group">
              {tasks.map((t, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {t}
                  <div>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => editTask(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteTask(index)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;