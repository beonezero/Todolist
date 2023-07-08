import React, {useCallback} from "react"
import s from "./Todolist.module.css"
import {TypeForFilter} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import Button from "@mui/material/Button";
import {Task} from "../Task";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

type TodolistType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: TypeForFilter, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTitle: (taskId: string, value: string, todolistId: string) => void
    removeTask: (mapTid: string, todolistId: string) => void
    addTasks: (title: string, todolistId: string) => void
    changeTodolistTitle: (id: string, value: string) => void
    filter: TypeForFilter
    removeTodolist: (todolistId: string) => void
}
export const Todolist = React.memo((props: TodolistType) => {
        console.log("Todolist is called")
        const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id])
        const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id])
        const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id])

        const removeTodolist = useCallback( () => {
            props.removeTodolist(props.id)
        }, [props.id, props.changeTodolistTitle])

        const changeTodolistTitle = (value: string) => {
            props.changeTodolistTitle(props.id, value)
        }

        const addTasks = useCallback((title: string) => {
            props.addTasks(title, props.id)
        },[props.addTasks, props.id])

        let tasksForTodolist = props.tasks

        if (props.filter === "active") {
            tasksForTodolist = props.tasks.filter(t => !t.isDone)
        }
        if (props.filter === "completed") {
            tasksForTodolist = props.tasks.filter(t => t.isDone)
        }

        return (
            <div className={s.Todolist}>
                <div>
                    <h2><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                        <button onClick={removeTodolist}>-</button>
                    </h2>
                </div>
                <AddItemForm addItem={addTasks}/>
                {
                    props.tasks.map(t => <Task
                        task={t}
                        removeTask={props.removeTask}
                        todolistId={props.id}
                        changeStatus={props.changeStatus}
                        changeTitle={props.changeTitle}
                        key={t.id}
                    />)
                }
                <div>
                    <Button color={"info"} variant={props.filter === "all" ? "contained" : "text"}
                            onClick={onAllClickHandler}>All
                    </Button>
                    <Button color={"success"} variant={props.filter === "active" ? "contained" : "text"}
                            onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button color={"warning"} variant={props.filter === "completed" ? "contained" : "text"}
                            onClick={onCompletedClickHandler}>Completed
                    </Button>
                </div>
            </div>

        )
    }
)

