import React from "react";
import "./Todo.css";
import { useState, useRef, useEffect } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function Todo() {
    const [Todo, setTodo] = useState("");
    const [Todos, setTodos] = useState([]);
    const [EditId, setEditId]= useState(0);

    useEffect(()=>{
        document.title = `you have ${Todos.length} pending task(s)`
    },[Todos]);

    const hanleSubmit = (e) => {
        e.preventDefault();
    };

    const addTodo = () => {
        if(Todo.trim() !== ''){
            const isDuplicate = Todos.some((todo) => todo.list.toLowerCase() === Todo.trim().toLowerCase());
            if (isDuplicate) {
                alert("Task already exists!");
                return;
            }
            setTodos([...Todos, {list:Todo , id : Date.now() , status : false}]);
            setTodo("");
        }
        if(EditId){
            if(Todo.trim() !== ''){
                const editTodo = Todos.find((Todo)=>Todo.id === EditId)

                const updateTodo = Todos.map((to)=> to.id === editTodo.id ? 

                (to = {id:to.id, list: Todo.trim()})
                 : 
                (to = {id:to.id, list: to.list}))
                setTodos(updateTodo)
                setEditId(0);
                setTodo('')
            }
        }
    };

    const inputRef = useRef("null");
    useEffect(() => {
        inputRef.current.focus();
    });

    const onComplete = (id)=>{
        let complete = Todos.map((list)=>{
        if(list.id===id){
            return ({...list , status : !list.status})
        }
        return list;
        })
        setTodos(complete)
    }

    const onEdit = (id)=>{
        const editTodo = Todos.find((to)=>to.id === id)
        setTodo(editTodo.list)
        setEditId(editTodo.id)
    }

    const onDelete = (id)=>{
        setTodos(Todos.filter((to)=>to.id !== id))
    }

    return (
        <div className="container">
            <h2>TODO-APP</h2>
            <form className="form-group" onSubmit={hanleSubmit}>
                <input type="text" value={Todo} ref={inputRef} placeholder="Add a Task" onChange={(event) => setTodo(event.target.value)}/>
                <button className="add-button" onClick={addTodo}>{EditId ? 'EDIT' : 'ADD'}</button>
            </form>
            <div className="list">
                <ul className="ulist">{
                Todos.map((to) => (
                    <li className="list-items">
                    <div className="list-item-list" id={to.status ? 'list-item': ' '}>{to.list}
                        <div className="icons">
                        <IoMdDoneAll className="list-item-icons" id="complete" title="complete" onClick={()=>onComplete(to.id)} />
                        <FiEdit className="list-item-icons" id="edit" title="edit" onClick={()=>onEdit(to.id)} />
                        <MdDelete className="list-item-icons" id="delete" title="delete" onClick={()=>onDelete(to.id)} />
                        </div>
                    </div>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
}

export default Todo;
