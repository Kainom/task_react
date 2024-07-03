import React, { Component } from "react";
import "./main.css";
import { MdAdd } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegEdit } from "react-icons/fa";
import moment from "moment";

function date() {
  const data = new Date();
  const date = moment(data).format("YYYY");

  const dayWeek = data.toLocaleString("pt-br", { weekday: "long" });
  const month = data.toLocaleDateString("pt-br", { month: "long" });
  const day = data.getDay();
  let dayWeekReplace = dayWeek.replace("s", "S");

  return `${dayWeekReplace}, ${month} ${day}, ${date}`;
}

export default class Main extends Component {
  state = {
    newTask: "",
    tasks: [],
    index: -1,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { tasks } = this.state;
    let { newTask } = this.state;
    newTask = newTask.trim();

    if (tasks.indexOf(newTask) != -1) return;

    const newTasks = [...tasks];

    if (this.state.index === -1) {
      this.setState({
        tasks: [...newTasks, newTask],
      });
    } else {
      newTasks[this.state.index] = newTask;
      this.setState({
        tasks: [...newTasks],
        index: -1,
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      newTask: e.target.value,
    });
  };

  handleDelet = (e, index) => {
    const { tasks } = this.state;
    console.log([...tasks.slice(0, 0)]);
    console.log([...tasks.slice(index + 1)]);

    this.setState({
      tasks: [...tasks.slice(0, index), ...tasks.slice(index + 1)],
      newTask: "",
    });
  };

  handleEdit = (e, index) => {
    const { tasks } = this.state;
    e.target.parentElement.parentElement.style.backgroundColor = "#30363d";
    e.target.parentElement.parentElement.style.borderRadius= "0.375rem";
    this.setState({
      newTask: tasks[index],
      index,
    });
  };

  render() {
    const { newTask, tasks } = this.state;
    return (
      <div className="container">
        <h1 className="list-title">Learn React</h1>
        <div className="task-container">
          <form onSubmit={this.handleSubmit} className="form-task" action="#">
            <input
              onChange={this.handleChange}
              type="text"
              value={newTask}
            ></input>
            <button id="add-task" hidden type="submit"></button>
            <label className="label-task" htmlFor="add-task">
              <MdAdd />
            </label>
          </form>
        </div>
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={task}>
              {task}
              <span className="action-task">
                <FaRegEdit
                  onClick={(e) => this.handleEdit(e, index)}
                  className="edit-task"
                />
                <TiDeleteOutline
                  onClick={(e) => this.handleDelet(e, index)}
                  className="remove-task"
                />
              </span>
            </li>
          ))}
        </ul>
        <div className="date-container">
          <h3 className="date">{date()}</h3>
        </div>
      </div>
    );
  }
}
