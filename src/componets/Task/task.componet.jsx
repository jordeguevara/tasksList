import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import Style from './task.style.scss'

function Task({description,priority,markTag,editTask,deleteTask,id,idx}) {
return(
    <div className="task" key={idx}>
    <p className="task-desc">{description}</p>
    <div className="action">
      <span
        className="tag"
        style={{ background: markTag(priority) }}
      ></span>
      <button onClick={() => editTask(id)} className="btn-action">
        <FontAwesomeIcon icon={faEdit} size="2x" color="green" />{" "}
      </button>
      <button onClick={() => deleteTask(id)} className="btn-action">
        <FontAwesomeIcon icon={faTrashAlt} color="red" size="2x" />{" "}
      </button>
    </div>
  </div>
)
}
export default Task;
