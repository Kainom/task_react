import React from "react";
import { MdAdd } from "react-icons/md";
import "./form.css";
import PropTypes from "prop-types";
export default function Form({ handleSubmit, handleChange, newTask }) {
  return (
    <div className="task-container">
      <form onSubmit={handleSubmit} className="form-task" action="#">
        <input onChange={handleChange} type="text" value={newTask}></input>
        <button id="add-task" hidden type="submit"></button>
        <label className="label-task" htmlFor="add-task">
          <MdAdd />
        </label>
      </form>
    </div>
  );
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired, 
  handleChange: PropTypes.func.isRequired,
  newTask: PropTypes.string.isRequired,
};
