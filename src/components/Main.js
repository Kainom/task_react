import React, { Component } from "react";
import "./main.css";
import moment from "moment"; 
import Form from "./Form";
import Tasks from "./Tasks";

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

    if (newTask === "") return;
    newTask = newTask.trim();

    if (newTask.length >= 61) {
      alert("A tarefa não pode ter mais de 60 caracteres.");
      return;
    }

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

  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    this.setState({
      tasks: tasks,
    });
  }

  componentDidUpdate(preveProps, prevState) {
    const { tasks } = this.state;

    if (tasks === prevState.tasks) return;

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  handleEdit = (e, index) => {
    const { tasks } = this.state;
    e.target.parentElement.parentElement.style.backgroundColor = "#30363d";
    e.target.parentElement.parentElement.style.borderRadius = "0.375rem";
    this.setState({
      newTask: tasks[index],
      index,
    });
  };


  render() {
    const { newTask, tasks } = this.state;
    return (
      <div className="container">
        <h1 className="list-title">Make your task</h1>
        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          newTask={newTask}
        />
        <Tasks
          handleDelet={this.handleDelet}
          handleEdit={this.handleEdit}
          tasks={tasks}
        />

        <div className="date-container">
          <h3 className="date">{date()}</h3>
        </div>
      </div>
    );
  }
}
