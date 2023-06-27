import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TasksStateType, TodolistAllType} from "../AppWithRedux";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store