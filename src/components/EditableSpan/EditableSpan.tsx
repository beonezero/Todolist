import React from "react"
import {ChangeEvent, useState} from "react";
import TextField from "@mui/material/TextField";

export type EditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log("EditableSpan")
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState("")
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <TextField id="filled-basic" variant="filled" value={title} onChange={onChangeTitleHandler}
                         onBlur={activateViewMode} autoFocus/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
})