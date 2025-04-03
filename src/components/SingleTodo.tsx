import React, { useRef, useState, useEffect } from 'react'
import './styles.css'
import { Todo } from '../models/models';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { Draggable } from '@hello-pangea/dnd';

interface Props {
    index: number;
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos }: Props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const setEditTodos = (id: number) => {
        setTodos(todos.map((todo) => todo.id === id ? { ...todo, todo: editTodo } : todo));
        setEdit(false);
        setEditTodo("");
    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setEditTodos(id);
    }

    const handleDone = (id: number) => {
        setTodos(todos.map((todo) => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo));
    }

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])

    return (
        <>
            <Draggable draggableId={todo.id.toString()} index={index}>
                {(provided, snapshot) => (
                    <form
                        className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
                        onSubmit={(e) => handleEdit(e, todo.id)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {edit ? (
                            <input ref={inputRef} value={editTodo} onChange={(e) => setEditTodo(e.target.value)} className='todos__single--text' />
                        ) : todo.isDone ? (
                            <s className="todos__single--text">{todo.todo}</s>
                        ) : (
                            <span className="todos__single--text">{todo.todo}</span>
                        )}
                        <div>
                            <span className="icon" onClick={() => {
                                if (!edit && !todo.isDone) {
                                    setEdit(!edit);
                                }
                            }}>
                                {/* <AiFillEdit /> */} Edit
                            </span>
                            <span className="icon" onClick={() => handleDelete(todo.id)}>
                                {/* <AiFillDelete /> */} Delete
                            </span>
                            <span className="icon" onClick={() => handleDone(todo.id)}>
                                {/* <MdDone /> */} Done
                            </span>
                        </div>
                    </form>
                )}
            </Draggable>
        </>
    )
}

export default SingleTodo