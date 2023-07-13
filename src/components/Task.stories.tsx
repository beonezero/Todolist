
import {action} from "@storybook/addon-actions"
import {Task} from "./Task";
import React from "react";

export default {
    title: "Task Component",
    component: Task
}

const changeTaskStatusCallback = action("Status changed")
const changeTaskTitleCallback = action("Title changed")
const removeTaskCallback = action("Task removed")

export const TaskBaseExample = () => {
    return <>
        <Task
            task={{id: "1",title: "JS", isDone: true }}
            removeTask={removeTaskCallback}
            todolistId={"todolistId1"}
            changeStatus={changeTaskStatusCallback}
            changeTitle={changeTaskTitleCallback}
        />
        <Task
            task={{id: "2",title: "React", isDone: false }}
            removeTask={removeTaskCallback}
            todolistId={"todolistId2"}
            changeStatus={changeTaskStatusCallback}
            changeTitle={changeTaskTitleCallback}
        />
    </>
}