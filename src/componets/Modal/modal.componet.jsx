import React, { useState, useRef } from "react";
import Dropdown from "../DropDown/dropdown.componet";
import "./modal.style.scss";

const MarginStyle = {
  small: { marginRight: 5, marginLeft: 5 },
  large: { marginRight: 25, marginLeft: 25 }
};
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
  const [validated, setValidated] = useState(true);

  const focus = () => inputEl.current.focus();

  const isValid = () => {
    if (priority >= 0 && value.length >= 2) {
      return true;
    } else {
      return false;
    }
  };

  const addTask = () => {

    if (isValid()) {
      add({ id: id, description: value, priority: priority });
      setId(id + 1);
      setIDarr(avoidIDCollisions.concat(id + 1));
      setValue("");
      setPriority(-1);
      setValidated(true);
      handleClose();
    }
    else{
      setValidated(false);
    }
  };

  const editTask = () => {
    if (isValid()) {
      editToList({ id: id, description: value, priority: priority });
      setEdited(false);
      setValue("");
      setPriority(-1);
      setValidated(true);
      handleClose();
    }
    else{
      setValidated(false);
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
            style={MarginStyle.large}
            title="Select Priority"
            list={DropDownlist}
            setPriority={setPriority}
            reset={reset}
            setReset={setReset}
          />
        </form>
        {validated ? null : <p style={{textAlign:'center', color: 'red', fonrSize: '11px'}}>Make sure you add a task of length >= 2 and select a priority</p>}
        <div className="modal-footer">
          <button
            style={MarginStyle.low}
            className=" button btn-primary"
            onClick={edited ? editTask : addTask}
          >
            {edited ? "Save" : "Add"}
          </button>
          <button
            style={MarginStyle.low}
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
