import React, {ChangeEvent, useState, MouseEvent} from 'react';
import {FilterTaskType, TaskType} from "./App";
import s from './Todolist.module.css'

type TodoPropsType = {
    title: string
    tasks: TaskType[]
    addTasks: (title: string) => void
    deleteTask: (id: string) => void
    changeStatusTask: (id: string, isDone: boolean) => void
    setFilterTasks: (filter: FilterTaskType) => void
    filterTasks: string
}

export function Todolist(props: TodoPropsType) {
    const {title, tasks, addTasks, deleteTask, changeStatusTask, setFilterTasks, filterTasks} = props
    const [newNameTask, setNameTask] = useState('')
    const [error, setError] = useState<boolean | null>(null)

    const setNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNameTask(event.currentTarget.value)
        setError(false)
    }
    const addTaskHandler = () => {
        if (newNameTask.trim() !== '') {
            addTasks(newNameTask.trim())
            setNameTask('')
        } else {
            setError(true)
        }

    }
    const deleteTaskHandler = (id: string) => {
        deleteTask(id)
    }
    const setFilterHandler = (filter: FilterTaskType) => {
        setFilterTasks(filter)
    }

    const taskMap = tasks.map((el) => {
        const changeStatusHandle = (e: MouseEvent<HTMLInputElement>) => changeStatusTask(el.id, e.currentTarget.checked)
        return (
            <li
                key={el.id}
                className={el.isDone ? s.isDone : ''}
            >
                <button
                    onClick={() => deleteTaskHandler(el.id)}
                >x
                </button>
                <input
                    onClick={changeStatusHandle}
                    type={"checkbox"}
                    checked={el.isDone}
                />
                {el.title}
            </li>
        )
    })
    const errorMessage = error && <div className={s.errorMessage}>name is not required</div>

    return <div>
        <h3>{title}</h3>
        <div>
            <input
                value={newNameTask}
                onChange={setNameHandler}
                className={error ? s.error : ''}
            />
            <button onClick={addTaskHandler}>+</button>
            {errorMessage}
        </div>
        <div>
            {taskMap}
        </div>
        <div>
            <button
                className={filterTasks === 'All' ? s.buttonFilter : ''}
                onClick={() => setFilterHandler('All')}
            >
                All
            </button>
            <button
                className={filterTasks === 'Active' ? s.buttonFilter : ''}
                onClick={() => setFilterHandler('Active')}
            >
                Active
            </button>
            <button
                className={filterTasks === 'Completed' ? s.buttonFilter : ''}
                onClick={() => setFilterHandler('Completed')}
            >
                Completed
            </button>
        </div>
    </div>
}
