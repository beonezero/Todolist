import React from "react"
import {ChangeEvent, KeyboardEvent, useState} from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log("AddItemForm")
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle("")
        } else {
            setError("Field is required !")
        }
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.ctrlKey && e.key === "Enter") {
            addTask()
        }
        const buttonStyles = {
            maxWidth: '30px',
            maxHeight: '30px',
            minWidth: '30px',
            minHeight: '30px',
            backgroundColor: 'red'
        }
    }
    return (
        <div>
            <TextField helperText={error} id="standard-basic" label={"Type value"} error={!!error} variant="standard"
                       value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyDown={onKeyDownHandler}/>
            <Fab onClick={addTask} size="small" color="secondary" aria-label="add">
                <AddIcon/>
            </Fab>
        </div>
    )
})