import React from "react";
import Task from "../Task/task.componet";
import styles from "./taskview.style.scss";

function TaskView({ tasks, deleteTask, editTask }) {
  const TaskDefaultStyle = {
    position: "absolute",
    top: "50%",
    color: "#fff",
    fontSize: "11px"
  };
  const TaskDefault = <p style={TaskDefaultStyle}>No Tasks to display</p>;

  const markTag = priority => {
    switch (priority) {
      case 0:
        return "#ffd700";
      case 1:
        return "orange";
      case 2:
        return "red";
      default:
        return "";
    }
  };

  return (
    <div className="taskView">
      {tasks.length < 1 ? TaskDefault : ""}
      {tasks.map((task, index) => {
        return (
          <Task
            id={task.id}
            description={task.description}
            priority={task.priority}
            idx={index}
            markTag={markTag}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        );
      })}
    </div>
  );
}

export default TaskView;
