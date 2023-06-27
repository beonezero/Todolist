import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeTodolistFilterActionTypeAC, changeTodolistTitleActionTypeAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type TypeForFilter = "all" | "active" | "completed"
export type TodolistAllType = {
    id: string
    title: string
    filter: TypeForFilter
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export function AppWithReducer() {

    function removeTask(mapTid: string, todolistId: string) {
        dispatchToTasksReducer(removeTaskAC(mapTid, todolistId))
    }

    function addTasks(title: string, todolistId: string) {
        dispatchToTasksReducer(addTaskAC(title, todolistId))
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatchToTasksReducer(changeTaskStatusAC(taskId, isDone, todolistId))
    }
    const changeTitle = (taskId: string, value: string, todolistId: string) => {
        dispatchToTasksReducer(changeTaskTitleAC(taskId, value, todolistId))
    }

    const changeTodolistTitle = (id: string, value: string) => {
        dispatchToTodolistReducer(changeTodolistTitleActionTypeAC(id, value))
    }


    function changeFilter(value: TypeForFilter, todolistId: string) {
        dispatchToTodolistReducer(changeTodolistFilterActionTypeAC(value, todolistId))
    }

    let todolistId1 = v1()
    let todolistId2 = v1()


    const [todolists, dispatchToTodolistReducer] = useReducer(todolistsReducer,[
            {id: todolistId1, title: "What to learn?", filter: "all"},
            {id: todolistId2, title: "What to buy?", filter: "all"}
        ]
    )

    let removeTodolist = (todolistId: string) => {
        dispatchToTodolistReducer(removeTodolistAC(todolistId))
        dispatchToTasksReducer(removeTodolistAC(todolistId))
    }

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer,{
            [todolistId1]: [
                {id: v1(), title: "apple", isDone: true},
                {id: v1(), title: "pea soup", isDone: true},
                {id: v1(), title: "bread", isDone: true},
                {id: v1(), title: "nuts", isDone: false},
            ],
            [todolistId2]: [
                {id: v1(), title: "Costume", isDone: false},
                {id: v1(), title: "House", isDone: false},
                {id: v1(), title: "Car", isDone: false},
                {id: v1(), title: "AirPods 2", isDone: true},
            ]
        }
    )

    function addTodolist(title: string) {
        dispatchToTodolistReducer(addTodolistAC(title))
        dispatchToTasksReducer(addTodolistAC(title))
    }

    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container maxWidth="lg">
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {
                            let tasksForTodolist = tasksObj[tl.id]
                            if (tl.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                            }
                            return <Grid item>
                                <Paper elevation={3}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTasks={addTasks}
                                        changeStatus={changeStatus}
                                        changeTitle={changeTitle}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>

        </div>
    )
        ;
}

