import React, { useState, useRef } from "react";
import Dropdown from "../DropDown/dropdown.componet";
import styles from "./modal.style.scss";
const Modal = ({
  handleClose,
  show,
  add,
  value,
  setValue,
  edited,
  setEdited,
  editToList,
  id,
  setId,
  setReset,
  reset,
  setIDarr,
  avoidIDCollisions
}) => {
  const inputEl = useRef(null);
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const handleChange = e => setValue(e.target.value);
  const [priority, setPriority] = useState(-1);
  const [DropDownlist, setDropDownList] = useState([
    {
      id: 0,
      title: "Low",
      selected: false
    },
    {
      id: 1,
      title: "Medium",
      selected: false
    },
    {
      id: 2,
      title: "High",
      selected: false
    }
  ]);
  const [validated, setValidated] = useState(false);

  const focus = ()=> inputEl.current.focus()

  const isValid = () => {
    if (priority >= 0 && value.length >= 2) {
      setValidated(true);
      return true;
    } else {
      alert("Make sure you add a task with a priority");
      return false;
    }
  };

  const addTask = () => {
    isValid();
    if (validated) {
      add({ id: id, description: value, priority: priority });
      setId(id + 1);
      setIDarr(avoidIDCollisions.concat(id + 1));
      setValue("");
      setPriority(-1);
      setValidated(false);
      handleClose();
    }
  };

  const editTask = () => {
    isValid();
    if (validated) {
      editToList({ id: id, description: value, priority: priority });
      setEdited(false);
      setValue("");
      setPriority(-1);
      setValidated(false);
      handleClose();
    }
  };

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <form className="modal-add">
          <input
            ref={inputEl}
            type="text"
            name="task"
            placeholder="Add task"
            value={value}
            onMouseOver={focus}
            onChange={e => handleChange(e)}
          />
          <Dropdown
            style={{ marginRight: 25, marginLeft: 25 }}
            title="Select Priority"
            list={DropDownlist}
            setPriority={setPriority}
            reset={reset}
            setReset={setReset}
          />
        </form>
        <div className="modal-footer">
          <button
            style={{ marginRight: 5, marginLeft: 5 }}
            className=" button btn-primary"
            onClick={edited ? editTask : addTask}
          >
            {edited ? "Edit" : "Add"}
          </button>
          <button
            style={{ marginTop: 5, marginLeft: 5 }}
            className=" button btn-secondary"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </section>
    </div>
  );
};

export default Modal;
