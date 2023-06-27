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
    removeTodolistAC
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type TypeForFilter = "all" | "active" | "completed"
export type TodolistAllType = {
    id: string
    title: string
    filter: TypeForFilter
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export function AppWithRedux() {

    const dispatch = useDispatch()

    const todolists = useSelector<AppRootState, TodolistAllType[]>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    function removeTask(mapTid: string, todolistId: string) {
        dispatch(removeTaskAC(mapTid, todolistId))
    }

    function addTasks(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    }
    const changeTitle = (taskId: string, value: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, value, todolistId))
    }

    const changeTodolistTitle = (id: string, value: string) => {
        dispatch(changeTodolistTitleActionTypeAC(id, value))
    }


    function changeFilter(value: TypeForFilter, todolistId: string) {
        dispatch(changeTodolistFilterActionTypeAC(value, todolistId))
    }

    let removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }


    function addTodolist(title: string) {
        dispatch(addTodolistAC(title))
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
                            let tasksForTodolist = tasks[tl.id]
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

