import React, { useState } from 'react';
import Card from './components/card/Card';
import TodoItem from './components/todo-item/TodoItem';
import Button from './components/button/Button';
import Modal from './components/modal/Modal';
import TodoForm from './components/todoForm/TodoForm';
import './App.css';

const TODOS_MOCK = [
  {
    id: '1',
    title: 'Todo 1',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. At id illo repellendus non maiores in pariatur aliquam iure fugit amet!',
    completed: false,
  },
  {
    id: '2',
    title: 'Todo 2',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit!',
    completed: false,
  },
  {
    id: '3',
    title: 'Todo 3',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit!',
    completed: true,
  },
  {
    id: '4',
    title: 'Todo 4',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit!',
    completed: true,
  },
];

function App() {
  const [todos, setTodos] = useState(TODOS_MOCK);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditing, setCurrentEditing] = useState(null);

  const handleCreateTodo = (e) => {
    e.preventDefault();
    if (isEditing) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === currentEditing ? { ...todo, title, description } : todo
        )
      );
    } else {
      const newTodo = {
        id: todos.length + 1,
        title,
        description,
        completed: false,
      };
      setTodos([...todos, newTodo]);
    }
    setTitle('');
    setDescription('');
    setIsModalOpen(false);
    setCurrentEditing(null);
    setIsEditing(false);
  };

  const toggleTodoCompleted = (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleEditTodo = (todoId) => {
    const todo = todos.find((todo) => todo.id === todoId);
    if (!todo) return;
    setTitle(todo.title);
    setDescription(todo.description);
    setIsEditing(true);
    setIsModalOpen(true);
    setCurrentEditing(todoId);
  };

  const handleDeleteTodo = (todoId) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
  };
  return (
    <div className='App'>
      <div className='app-container'>
        {/* 
            This is your Create Card component.
          */}
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setIsEditing(false);
            }}
          >
            <Card>
              <h2>{isEditing ? 'Edit Todo' : 'Create Todo'}</h2>
              <TodoForm
                onSubmit={handleCreateTodo}
                title={title}
                description={description}
                isEditing={isEditing}
                onDescriptionChange={setDescription}
                onTitleChange={setTitle}
              />
            </Card>
          </Modal>
        )}

        {/* 
          My Todos
        */}
        <Card>
          <h1>My todos</h1>
          <Button onClick={() => setIsModalOpen(true)}>Add +</Button>
          <div className='list-container'>
            <TodoItem
              todos={todos.filter((todo) => !todo.completed)}
              onToggleComplete={toggleTodoCompleted}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
            />
          </div>

          <div className='separator'></div>

          <h2>Completed</h2>
          <div className='list-container'>
            <TodoItem
              todos={todos.filter((todo) => todo.completed)}
              onToggleComplete={toggleTodoCompleted}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
