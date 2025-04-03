import React from 'react'
import { Todo } from '../models/models';
import './styles.css'
import SingleTodo from './SingleTodo';
import { Droppable } from '@hello-pangea/dnd';

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }: Props) => {
    return (
        <>
            <div className="container">
                <Droppable droppableId='TodosList' >
                    {(provided, snapshot) => (
                        <div className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
                            <span className="todos__heading">Active Tasks</span>
                            {todos.map((todo, index) => (
                                <SingleTodo index={index} todo={todo} key={todo.id} todos={todos} setTodos={setTodos} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <Droppable droppableId='TodosRemove' >
                    {(provided, snapshot) => (
                        <div className={`todos remove ${snapshot.isDraggingOver ? "dragactive" : "remove"}`} ref={provided.innerRef} {...provided.droppableProps}>
                            <span className="todos__heading">Completed Tasks</span>
                            {todos.map((todo, index) => (
                                <SingleTodo index={index} todo={todo} key={todo.id} todos={completedTodos} setTodos={setCompletedTodos} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </>
    )
}

export default TodoList