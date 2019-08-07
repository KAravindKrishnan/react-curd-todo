import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ListItem from "./ListItem";
import axios from "axios";
import LoaderImage from "./hypnoticLoader.gif";

class App extends React.Component {
  constructor() {
    super();
    this.apiUrl = "https://5d4ac2a65c331e00148eb7a2.mockapi.io/";
    this.state = {
      newTodo: "",
      updateTodo: false,
      todos: [],
      loading: true
    };
    this.deleteTodo = this.deleteTodo.bind(this);
  }
  async componentDidMount() {
    const response = await axios.get(`${this.apiUrl}/todos`);
    this.setState({ todos: response.data, loading: false });
  }
  handelChange = event => {
    this.setState({
      newTodo: event.target.value
    });
  };
  async addTodo() {
    if (!this.state.newTodo) {
      alert("Title is required");
      return;
    }
    const response = await axios.post(`${this.apiUrl}/todos`, {
      title: this.state.newTodo,
      isComplete: false
    });
    this.setState({
      todos: [...this.state.todos, response.data],
      newTodo: ""
    });
    this.alert("Added successfully");
  }
  async deleteTodo(id) {
    const todos = this.state.todos.filter(task => task.id !== id);
    await axios.delete(`${this.apiUrl}/todos/${id}`);
    // delete todos[index];
    this.setState({ todos });
    this.alert("Deleted successfully");
  }
  updateTodo(id) {
    this.setState({
      updateTodo: true,
      newTodo: this.state.todos.filter(task => task.id === id)[0].title,
      updateId: id
    });
  }
  async editTodo() {
    console.log(this.state.updateId);
    const response = await axios.put(
      `${this.apiUrl}/todos/${this.state.updateId}`,
      {
        title: this.state.newTodo
      }
    );
    this.setState({
      todos: this.state.todos.map(task => {
        if (task.id === this.state.updateId) return response.data;
        return task;
      }),
      updateTodo: false,
      updateId: null,
      newTodo: ""
    });
    this.alert("Edited successfully");
  }
  alert = msg => {
    this.setState({
      notification: msg
    });
    setTimeout(() => this.setState({ notification: null }), 2300);
  };
  render() {
    return (
      <div className='App container'>
        <header className='App-header' style={{ minHeight: "100px" }}>
          <img src={logo} className='App-logo' alt='logo' />
        </header>

        <div className='container mt-5'>
          {this.state.notification && (
            <div className='alert alert-success mt-3'>
              <span className='text-center'>{this.state.notification}</span>
            </div>
          )}

          <input
            type='text'
            className='form-control my-3 text-center'
            onChange={this.handelChange}
            value={this.state.newTodo}
            placeholder='Enter a new task'
          />
          <button
            onClick={
              this.state.updateTodo
                ? this.editTodo.bind(this)
                : this.addTodo.bind(this)
            }
            className='btn btn-block my-2 btn-success '
            disabled={!this.state.newTodo}>
            {this.state.updateTodo ? "Update task" : "Add New"}
          </button>
          {this.state.loading && (
            <img className='img-fluid' src={LoaderImage} alt='Loading.' />
          )}
          {(!this.state.updateTodo || this.state.loading) && (
            <ul className='list-group'>
              {this.state.todos.map((task, index) => (
                <ListItem
                  key={task.id}
                  task={task}
                  updateTodo={this.updateTodo.bind(this, task.id)}
                  deleteTodo={this.deleteTodo.bind(this, task.id)}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default App;
