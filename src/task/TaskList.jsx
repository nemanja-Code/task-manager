import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeProvider";
import styles from "./TaskList.module.css";

function TaskList({ tasks, onRemove, onEdit }) {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className={`${styles.taskListContainer} ${theme === "dark" ? styles.dark : ""}`}>
      <ul className={styles.taskList}>
        {tasks.map(task => (
          <li key={task.id} className={`${styles.taskItem} ${theme === "dark" ? styles.dark : ""}`}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <button className={`${styles.button} ${theme === "dark" ? styles.dark : ""}`} onClick={() => onEdit(task)}>Edit</button>
            <button  className={`${styles.button} ${theme === "dark" ? styles.dark : ""}`} onClick={() => onRemove(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      status: PropTypes.string
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default TaskList;
