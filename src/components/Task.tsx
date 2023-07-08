import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./Todolist/Todolist";

type TaskPropsType = {
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTitle: (taskId: string, value: string, todolistId: string) => void
    removeTask: (mapTid: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onRemoveHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }
    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    }
    const onChangeTitleHandler = useCallback((value: string) => {
        props.changeTitle(props.task.id, value, props.todolistId)
    },[props.task.id,props.changeTitle, props.todolistId])
    return <div className={props.task.isDone ? "is-done" : ""} key={props.task.id}>
        <span><EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/></span>
        <Checkbox checked={props.task.isDone} onChange={changeStatusHandler} icon={<FavoriteBorder/>}
                  checkedIcon={<Favorite/>}/>
        <IconButton onClick={onRemoveHandler} aria-label="delete" size="large">
            <DeleteIcon/>
        </IconButton>
    </div>
})