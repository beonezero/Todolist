import React, {useCallback} from "react"
import s from "./Todolist.module.css"
import {TypeForFilter} from "../../App";
import {ChangeEvent} from "react";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Checkbox from '@mui/material/Checkbox';

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

type TodolistType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (mapTid: string, todolistId: string) => void
    changeFilter: (value: TypeForFilter, todolistId: string) => void
    addTasks: (title: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTitle: (taskId: string, value: string, todolistId: string) => void
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
                <div>
                    {props.tasks.map((t) => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (value: string) => {
                            props.changeTitle(t.id, value, props.id)

                        }
                        return <div className={t.isDone ? "is-done" : ""} key={t.id}>
                            <span><EditableSpan title={t.title} onChange={onChangeTitleHandler}/></span>
                            <Checkbox checked={t.isDone} onChange={changeStatusHandler} icon={<FavoriteBorder/>}
                                      checkedIcon={<Favorite/>}/>
                            <IconButton onClick={onRemoveHandler} aria-label="delete" size="large">
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                    })}
                </div>
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

type TaskPropsType = {

}
const Task = (props: TaskPropsType) => {
    return const onRemoveHandler = () => {
        props.removeTask(t.id, props.id)
    }
    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(t.id, e.currentTarget.checked, props.id)
    }
    const onChangeTitleHandler = (value: string) => {
        props.changeTitle(t.id, value, props.id)

    }
    return <div className={t.isDone ? "is-done" : ""} key={t.id}>
        <span><EditableSpan title={t.title} onChange={onChangeTitleHandler}/></span>
        <Checkbox checked={t.isDone} onChange={changeStatusHandler} icon={<FavoriteBorder/>}
                  checkedIcon={<Favorite/>}/>
        <IconButton onClick={onRemoveHandler} aria-label="delete" size="large">
            <DeleteIcon/>
        </IconButton>
    </div>
}