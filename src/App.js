import React, { Component } from 'react';

/// Modifica el componente para que se puedan agregar tareas, tachar y destacharlas y error de validacion en el input

class App extends Component {
  constructor() {
    super()
    this.state = {
      tasks: [
        { id: 1, name: "Sacar la ropa", done: false },
        { id: 2, name: "Hacer la cama", done: true },
        { id: 3, name: "Leer un rato", done: false }
      ],
      newTask: '',
      hasError: false

    }
    this.addTask = this.addTask.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.updateTask = this.updateTask.bind(this)
  }

  addTask(event){
    if (this.state.newTask === '') {
      this.setState({
        hasError: true
      })
    } else {
      this.setState({
        tasks: this.state.tasks.concat({name: this.state.newTask, done: false}),
        newTask: ''
      })    
    }
    event.preventDefault();
  }

  handleChange(event){
    this.setState({
      newTask: event.target.value
    })
  }

  updateTask(event){
    const index = this.state.tasks.findIndex(task =>
      task.name === event.target.innerHTML
      );
    this.setState({
      tasks: this.state.tasks.map((task, i) =>
        i === index ? {name: task.name, done: !task.done}: task
      )
    })
  }

  render() {
    return (
      <div className="wrapper">
        <div className="list">
          <h3>Por hacer:</h3>
          <ul className="todo">
            {this.state.tasks.map((task, index) => <li key={index} onClick={this.updateTask} className={task.done ? "done" : ""}>{task.name}</li>)}
          </ul>
          <form onSubmit={this.addTask}>
            <input type="text" id="new-task" placeholder="Ingresa una tarea y oprime Enter" onChange={this.handleChange} value={this.state.newTask} className={this.state.hasError ? "error" : ""}/>
          </form>
        </div>
      </div>
    )
  }
}

export default App;
