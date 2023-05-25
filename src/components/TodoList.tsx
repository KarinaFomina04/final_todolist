import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from 'react'
import {FilterType, PropsType} from "./Types";



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
    const onAllClickHandler = (todolistId:string) => {
        props.changeFilter(todolistId, 'all')
    }
    const onActiveClickHandler = (todolistId:string) => {
        props.changeFilter(todolistId, 'active')
    }
    const onComplitedClickHandler = (todolistId:string) => {
        props.changeFilter(todolistId,'completed')
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
                <button className={props.filter === 'all'? 'active': ''} onClick={e=> onAllClickHandler(props.todolistId)}>All</button>
                <button className={props.filter === 'active'? 'active-filter': ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed'? 'active-filter': ''} onClick={onComplitedClickHandler}>Completed</button>
            </div>
        </div>
    )
}