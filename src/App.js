import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Modal from "./componets/Modal/modal.componet";
import TaskView from "./componets/TaskView/taskview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const KeyViewStyle = {
  marginTop: 15,
  marginBottom: 15
};

const PriorityStyle = {
  low: { background: "#ffd700" },
  medium: { background: "orange" },
  high: { background: "red" },
  text: { color: "#fff" }
};

const ButtonStyle = {
  marginRight: 10,
  marginLeft: 10
};
const KeyView = () => (
  <div style={KeyViewStyle}>
    <span style={PriorityStyle.text}>Priority Levels </span>
    <span className="key" style={PriorityStyle.low}>
      Low
    </span>
    <span className="key" style={PriorityStyle.medium}>
      Medium
    </span>
    <span className="key" style={PriorityStyle.high}>
      High
    </span>
  </div>
);

function App() {
  const [avoidIDCollisions, setIDarr] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showModal, setModal] = useState(false);
  const [value, setValue] = useState("");
  const [edited, setEdited] = useState(false);
  const [reset, setReset] = useState(false);
  const [id, setId] = useState(0);
  const mounted = useRef();

  useEffect(() => {
    // First Render 
    let sessionTasks = sessionStorage.getItem("userTasks");
    let sessionIdsArr = sessionStorage.getItem("IDArr");
    let sessionId = sessionStorage.getItem("id");
    if (sessionTasks !== null) {
      setTasks(JSON.parse(sessionStorage.getItem("userTasks")));
    }
    if (sessionIdsArr !== null) {
      setIDarr(JSON.parse(sessionStorage.getItem("IDArr")));
    }
    if (sessionId !== null) {
      // if refreshed before edit is submitted update id to most recent id
      const currentId = JSON.parse(sessionStorage.getItem("id"))
      const arr = JSON.parse(sessionStorage.getItem("IDArr"))
      const mostRecentId = arr[arr.length-1];
      const newId = currentId < mostRecentId ? mostRecentId : currentId;
      setId(newId);
    } else {
      setIDarr(avoidIDCollisions.concat(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setReset(true);
      sessionStorage.setItem("userTasks", JSON.stringify(tasks));
      sessionStorage.setItem("IDArr", JSON.stringify(avoidIDCollisions));
      sessionStorage.setItem("id", JSON.stringify(id));
    }
  }, [avoidIDCollisions, id, tasks]);

  const displayModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
    //
    if (edited) {
      setId(avoidIDCollisions[avoidIDCollisions.length - 1]);
      setValue("");
      setEdited(false);
    }
  };

  const addToList = val => {
    setTasks(tasks.concat(val));
  };

  const editTask = id => {
    setEdited(true);
    const editingOne = tasks.filter(task => task.id === id);
    setValue(editingOne[0].description);
    setId(editingOne[0].id);
    setModal(true);
  };

  const editToList = val => {
    let arr = [...tasks];
    const list = arr.map(item => {
      if (val.id === item.id) {
        return val;
      } else {
        return item;
      }
    });
    setTasks(list);
    sessionStorage.setItem("userTasks", JSON.stringify(tasks));
    setId(avoidIDCollisions[avoidIDCollisions.length - 1] + 1);
  };

  const deleteTask = id => {
    const arr = tasks.slice(0);
    const taskWithDeleted = arr.filter(item => item.id !== id);
    setTasks(taskWithDeleted);
  };

  const sortAscending = () => {
    const arr = tasks.slice(0);
    const sortedTask = arr.sort(
      (a, b) => parseInt(a.priority) - parseInt(b.priority)
    );
    setTasks(sortedTask);
  };

  const sortDescending = () => {
    const arr = tasks.slice(0);
    const sortedTask = arr.sort(
      (a, b) => parseInt(b.priority) - parseInt(a.priority)
    );
    setTasks(sortedTask);
  };

  return (
    <div className="container bg-main">
      <h2 className="header">Tasks List</h2>
      <KeyView />
      <Modal
        setId={setId}
        id={id}
        value={value}
        setValue={setValue}
        show={showModal}
        handleClose={hideModal}
        add={addToList}
        setEdited={setEdited}
        edited={edited}
        editToList={editToList}
        setReset={setReset}
        reset={reset}
        setIDarr={setIDarr}
        avoidIDCollisions={avoidIDCollisions}
      />
      <button
        className="button btn-main"
        style={ButtonStyle}
        onClick={displayModal}
      >
        +
      </button>
      <button
        className="button btn-main"
        style={ButtonStyle}
        onClick={sortAscending}
      >
        Sort <FontAwesomeIcon icon={faAngleUp} size="1x" />
      </button>
      <button
        className="button btn-main"
        style={ButtonStyle}
        onClick={sortDescending}
      >
        Sort <FontAwesomeIcon icon={faAngleDown} size="1x" />
      </button>
      <TaskView tasks={tasks} deleteTask={deleteTask} editTask={editTask} />
    </div>
  );
}

export default App;
