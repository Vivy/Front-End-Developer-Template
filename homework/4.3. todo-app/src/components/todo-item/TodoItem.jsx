// import React, { useState } from 'react';
import './TodoItem.css';
import Checkbox from '../checkbox/CheckBox';

const TodoItem = ({ todos, onToggleComplete, onEdit, onDelete }) => {
  const handleCheckboxChange = (id) => {
    if (onToggleComplete) {
      onToggleComplete(id);
    }
  };
  const handleEdit = (id) => {
    if (onEdit) onEdit(id);
  };
  const handleDelete = (id) => {
    if (onDelete) onDelete(id);
  };

  return todos.map((todo) => {
    return (
      <div
        className={`todo-item ${todo.completed && 'todo-completed'}`}
        key={todo.id}
      >
        <div className='todo-item-header'>
          <div className='title-area'>
            <Checkbox
              checked={!!todo.completed}
              onChange={() => handleCheckboxChange(todo.id)}
            />

            <h4>{todo.title}</h4>
          </div>
          <div>
            <button className='sterge' onClick={() => handleEdit(todo.id)}>
              <i className='fa fa-pencil' aria-hidden='true'></i>
            </button>
            <button className='sterge' onClick={() => handleDelete(todo.id)}>
              <i className='fa fa-trash' aria-hidden='true'></i>
            </button>
          </div>
        </div>

        <div className='separator'></div>

        <p>{todo.description}</p>
      </div>
    );
  });
};

export default TodoItem;
