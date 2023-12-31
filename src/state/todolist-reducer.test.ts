import React from "react";
import {v1} from "uuid";
import {TodolistAllType, TypeForFilter} from "../App";
import {
    addTodolistAC,
    ChangeTodolistFilterActionType, changeTodolistFilterActionTypeAC,
    changeTodolistTitleActionTypeAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolist-reducer";

test("correct todolist should be removed", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistAllType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle: string = "New Todolist";

    const startState: TodolistAllType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe("all")
})


test("correct todolist should change its name", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle: string = "New Todolist";

    const startState: TodolistAllType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]


    const endState = todolistsReducer(startState, changeTodolistTitleActionTypeAC(todolistId2, newTodolistTitle))


    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodolistTitle)
})

test("correct filter of todolist should be changed", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: TypeForFilter = "completed";

    const startState: TodolistAllType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]


    const endState = todolistsReducer(startState, changeTodolistFilterActionTypeAC(newFilter, todolistId2))


    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})
