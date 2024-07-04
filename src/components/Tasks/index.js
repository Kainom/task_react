import React from "react";
import "./tasks.css";
import { FaRegEdit } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import PropTypes from "prop-types";
export default function Tasks({ tasks, handleEdit, handleDelet }) {
  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <li key={task}>
          <span className="task">{task}</span>
          <span className="action-task">
            <FaRegEdit
              onClick={(e) => handleEdit(e, index)}
              className="edit-task"
            />
            <TiDeleteOutline
              onClick={(e) => handleDelet(e, index)}
              className="remove-task"
            />
          </span>
        </li>
      ))}
    </ul>
  );
}

Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelet: PropTypes.func.isRequired,
};
