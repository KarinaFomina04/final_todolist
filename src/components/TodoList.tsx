import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from 'react'
import {FilterType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    task: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterType
}


export const TodoList = (props: PropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        }else {
            setError("Title is required")
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTask()
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onComplitedClickHandler = () => {
        props.changeFilter('completed')
    }
    return (
        <div>
            <h3>props.title</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error?'error':''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {props.task.map(el => {
                    const onClickHandler = () => props.removeTask(el.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        console.log(newIsDoneValue,"newIsDoneValue")
                        props.changeTaskStatus(el.id, newIsDoneValue)
                    }
                    return (
                        <li className={el.isDone? 'is-done': ''} key={el.id}>
                            <input
                                type="checkbox"
                                checked={el.isDone}
                                onChange={onChangeHandler}
                            />
                            <span>{el.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    )})}
            </ul>
            <div>
                <button className={props.filter === 'all'? 'active': ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active'? 'active-filter': ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed'? 'active-filter': ''} onClick={onComplitedClickHandler}>Completed</button>
            </div>
        </div>
    )
}