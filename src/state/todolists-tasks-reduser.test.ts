import {addTodolistAC, todolistsReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TasksStateType, TodolistAllType} from "../App";

test("ids should be equals", () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistAllType> = []

    const action = addTodolistAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})