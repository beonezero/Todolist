import {TodolistAllType, TypeForFilter} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}

export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
}

export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: TypeForFilter
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistsReducer = (state: TodolistAllType[], action: ActionsType,): TodolistAllType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST" :
            return state.filter(st => st.id !== action.id)

        case "ADD-TODOLIST" :
            return [...state, {id: v1(), title: action.title, filter: "all"}]

        case "CHANGE-TODOLIST-TITLE" :
            const todolist  = state.find(td => td.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]

        case "CHANGE-TODOLIST-FILTER" :
            const changeFilterTodolist  = state.find(td => td.id === action.id)
            if (changeFilterTodolist) {
                changeFilterTodolist.filter = action.filter
            }
            return [...state]


        default:
            throw new Error("I don`t understand this action type")
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistId} as const
}

export const addTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: newTodolistTitle} as const
}

export const changeTodolistTitleActionTypeAC = (todolistId2: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: todolistId2, title: newTodolistTitle} as const
}

export const changeTodolistFilterActionTypeAC = (todolist2: string, newFilter: TypeForFilter): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: todolist2, filter: newFilter}
}