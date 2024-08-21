import { useState, useReducer, useContext } from "react";
import TaskList from "./TaskList";
import styles from "./TaskForm.module.css";
import { ThemeContext } from "../theme/ThemeProvider"; // Importuj ThemeContext

const ACTIONS = {
  ADD_TASK: "add-task",
  REMOVE_TASK: "remove-task",
  UPDATE_TASK: "update-task"
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return [...state, { id: Date.now(), ...action.payload }];
    case ACTIONS.REMOVE_TASK:
      return state.filter(task => task.id !== action.payload.id);
    case ACTIONS.UPDATE_TASK:
      return state.map(task =>
        task.id === action.payload.id
          ? { ...task, ...action.payload }
          : task
      );
    default:
      return state;
  }
};

function TaskForm() {
  const { theme } = useContext(ThemeContext); // Učitaj temu iz konteksta
  const [tasks, dispatch] = useReducer(reducer, []);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("incomplete");
  const [editingTask, setEditingTask] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      dispatch({
        type: ACTIONS.UPDATE_TASK,
        payload: {
          id: editingTask.id,
          title,
          description,
          status
        }
      });
      setEditingTask(null);
    } else {
      dispatch({
        type: ACTIONS.ADD_TASK,
        payload: {
          title,
          description,
          status
        }
      });
    }
    setTitle("");
    setDescription("");
    setStatus("incomplete");
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
  };

  const handleRemove = (id) => {
    dispatch({ type: ACTIONS.REMOVE_TASK, payload: { id } });
  };

  return (
    <div className={`${styles.formContainer} ${theme === "dark" ? styles.dark : ""}`}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className={styles.inputField}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className={styles.textArea}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={styles.selectField}
        >
          <option value="incomplete">Incomplete</option>
          <option value="complete">Complete</option>
        </select>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
      <TaskList tasks={tasks} onRemove={handleRemove} onEdit={handleEdit} />
    </div>
  );
}

export default TaskForm;
