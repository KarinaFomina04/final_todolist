import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {FilterType, TodolistsType} from "./Types";


function App() {

    // const [tasks, setTasks] = useState(
    //     [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false},
    //     ]
    // );

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    let [todolists, setTodolists] = useState<Array<TodolistsType>>(
        [
            {id: v1(), title: 'What to learn', filter: 'all'},
            {id: v1(), title: 'What to buy', filter: 'all'},
        ]
    )

    const removeTask = (id: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        setTasks(tasks.filter(el => el.id !== id))
    }

    const changeFilter = (todolistId:string, value: FilterType) => {
        let todolist=todolists.find(el=>el.id === todolistId)
        if(todolist){
            todolist.filter = value
            setTodolists([...todolists])
        }
    }
    const addTask = (title: string) => {
        let task = {id: v1(), title, isDone: false}
        let newTask = [task, ...tasks]
        setTasks(newTask)
    }
    const changeTaskStatus = (id: string, isDone: boolean) => {
        let newTasks = tasks.map(t => {
            if (t.id === id) return {...t, isDone}
            else return t
        })
        setTasks(newTasks)
    }

    return (
        <div className="App">
            {
                todolists.map(todolist => {
                    let taskForTodolist = tasks
                    if (todolist.filter === 'active') {
                        taskForTodolist = tasks.filter(el => !el.isDone)
                    }
                    if (todolist.filter === 'completed') {
                        taskForTodolist = tasks.filter(el => el.isDone)
                    }
                    return <TodoList key={todolist.id}
                                     todolistId={todolist.id}
                                     id={todolist.id}
                                     title={todolist.title}
                                     task={taskForTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeTaskStatus}
                                     filter={todolist.filter}
                    />
                })
            }

        </div>
    );
}

export default App;
