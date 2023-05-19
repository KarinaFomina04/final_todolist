import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterType = "all" | "active" | "completed"

function App() {

    const [tasks, setTasks] = useState(
        [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
        ]
    )

    const [filter, setFilter] = useState<FilterType>("all")


    let taskForTodolist = tasks
    if(filter === 'active') {
        taskForTodolist = tasks.filter(el => !el.isDone)
    }
    if(filter === 'completed') {
        taskForTodolist = tasks.filter(el => el.isDone)
    }
    const removeTask =(id: string)=> {
        setTasks(tasks.filter(el => el.id !== id))
    }

    const changeFilter = (value: FilterType) => {
        setFilter(value)
    }
    const addTask = (title: string) => {
        let task = { id: v1(), title, isDone: false }
        let newTask = [task, ...tasks]
        setTasks(newTask)
    }
    const changeTaskStatus = (id: string, isDone: boolean) => {
        let newTasks = tasks.map(t => {
           if( t.id === id) return {...t,isDone}
           else return t
        })
        setTasks(newTasks)
    }

    return (
        <div className="App">
            <TodoList
                title = "What to learn"
                task={taskForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
