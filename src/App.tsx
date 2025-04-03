import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './models/models';
import TodoList from './components/TodoList';
import { DragDropContext } from '@hello-pangea/dnd';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    document.body.style.color = "black";
    document.body.style.transition = "background-color 0.5s ease";

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    let add, active = todos, complete = completedTodos;
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, { ...add, isDone: false });
    } else {
      complete.splice(destination.index, 0, { ...add, isDone: true });
    }
    setCompletedTodos(complete);
    setTodos(active);
  };

  const onDragStart = () => {
    document.body.style.color = "orange";
    document.body.style.transition = "background-color 0.5s ease";
  };

  const onDragUpdate = (update: any) => {
    document.body.style.color = update.destination ? "green" : "red";
    document.body.style.transition = "background-color 0.5s ease";
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart} onDragUpdate={onDragUpdate}>
      <div className="App">
        <span className="heading">Tasking</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
      </div>
    </DragDropContext>
  );
}

export default App;