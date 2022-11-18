import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterTaskType = 'All' | "Active" | 'Completed'


function App() {
    const title = 'What to learn'
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: true},
        {id: v1(), title: 'GraphQL', isDone: true},
    ])
    const [filterTasks, setFilterTasks] = useState<FilterTaskType>('All')
    const addTasks = (title: string) => {
        const newTask = {id: v1(), title, isDone: true}
        setTasks([newTask, ...tasks])
    }
    const deleteTask = (id: string) => {
        setTasks(tasks.filter((el) => el.id !== id))
    }
    const changeStatusTask = (id: string, isDone: boolean) => {
        setTasks(tasks.map((el) => el.id === id ? {...el, isDone} : el))
    }
    const filteredTasks = (filter: FilterTaskType) => {
        const copeTasks = tasks
        switch (filter) {
            case "Active":
                return copeTasks.filter(el => !el.isDone)
            case "Completed":
                return copeTasks.filter(el => el.isDone)
            default:
                return copeTasks
        }
    }
    return (
        <div className="App">
            <Todolist
                title={title}
                tasks={filteredTasks(filterTasks)}
                addTasks={addTasks}
                deleteTask={deleteTask}
                changeStatusTask={changeStatusTask}
                setFilterTasks={setFilterTasks}
                filterTasks={filterTasks}
            />
        </div>
    );
}

export default App;
