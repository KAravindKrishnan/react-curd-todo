import React from "react";

class ListItem extends React.Component {
  render() {
    return (
      <li
        className='list-group-item'
        key={this.props.task.id}
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px 20%"
        }}>
        <button className='btn btn-sm btn-info' onClick={this.props.updateTodo}>
          U
        </button>
        <span
          style={{
            textDecoration: this.props.task.isComplete
              ? "line-through"
              : "inherit"
          }}>
          {this.props.task.title}
        </span>
        <button
          className='btn btn-sm btn-danger'
          onClick={this.props.deleteTodo}>
          x
        </button>
      </li>
    );
  }
}

export default ListItem;
