import {TasksStateType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../components/Todolist/Todolist";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolist-reducer";

test("correct task should be delete from correct array", () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "apple", isDone: true},
            {id: "2", title: "pea soup", isDone: true},
            {id: "3", title: "bread", isDone: true},
            {id: "4", title: "nuts", isDone: false},
        ],
        "todolistId2": [
            {id: "1", title: "Costume", isDone: false},
            {id: "2", title: "House", isDone: false},
            {id: "3", title: "Car", isDone: false},
            {id: "4", title: "AirPods 2", isDone: true},
        ]
    }

    const action = removeTaskAC("2", "todolistId2")
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(4)
    expect(endState["todolistId2"].length).toBe(3)
    expect(endState["todolistId2"].every((t: any)  => t.id != "2")).toBeTruthy()

})

test("correct task should be added from correct array", () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "apple", isDone: true},
            {id: "2", title: "pea soup", isDone: true},
            {id: "3", title: "bread", isDone: true},
            {id: "4", title: "nuts", isDone: false},
        ],
        "todolistId2": [
            {id: "1", title: "Costume", isDone: false},
            {id: "2", title: "House", isDone: false},
            {id: "3", title: "Car", isDone: false},
            {id: "4", title: "AirPods 2", isDone: true},
        ]
    }

    const action = addTaskAC("Juce", "todolistId2")
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(4)
    expect(endState["todolistId2"].length).toBe(5)
    expect(endState["todolistId2"][0].id).toBeDefined()
    expect(endState["todolistId2"][0].title).toBe("Juce")
    expect(endState["todolistId2"][0].isDone).toBe(false)

})

test("status of specified task should be changed", () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "apple", isDone: true},
            {id: "2", title: "pea soup", isDone: false},
            {id: "3", title: "bread", isDone: true},
            {id: "4", title: "nuts", isDone: false},
        ],
        "todolistId2": [
            {id: "1", title: "Costume", isDone: false},
            {id: "2", title: "House", isDone: false},
            {id: "3", title: "Car", isDone: false},
            {id: "4", title: "AirPods 2", isDone: true},
        ]
    }

    const action = changeTaskStatusAC("2", true, "todolistId2")
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].isDone).toBe(false)
    expect(endState["todolistId2"][1].isDone).toBe(true)

})

test("title of specified task should be changed", () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "apple", isDone: true},
            {id: "2", title: "pea soup", isDone: false},
            {id: "3", title: "bread", isDone: true},
            {id: "4", title: "nuts", isDone: false},
        ],
        "todolistId2": [
            {id: "1", title: "Costume", isDone: false},
            {id: "2", title: "House", isDone: false},
            {id: "3", title: "Car", isDone: false},
            {id: "4", title: "AirPods 2", isDone: true},
        ]
    }

    const action = changeTaskTitleAC("2", "Plain", "todolistId2")
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe("pea soup")
    expect(endState["todolistId2"][1].title).toBe("Plain")

})

test("new property with new array should be added when new todolist is added", () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "apple", isDone: true},
            {id: "2", title: "pea soup", isDone: false},
            {id: "3", title: "bread", isDone: true},
            {id: "4", title: "nuts", isDone: false},
        ],
        "todolistId2": [
            {id: "1", title: "Costume", isDone: false},
            {id: "2", title: "House", isDone: false},
            {id: "3", title: "Car", isDone: false},
            {id: "4", title: "AirPods 2", isDone: true},
        ]
    }

    const action = addTodolistAC("title no matter")
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2")

    if(!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

})

test("property with todolistId should be delete", () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "apple", isDone: true},
            {id: "2", title: "pea soup", isDone: false},
            {id: "3", title: "bread", isDone: true},
            {id: "4", title: "nuts", isDone: false},
        ],
        "todolistId2": [
            {id: "1", title: "Costume", isDone: false},
            {id: "2", title: "House", isDone: false},
            {id: "3", title: "Car", isDone: false},
            {id: "4", title: "AirPods 2", isDone: true},
        ]
    }

    const action = removeTodolistAC("todolistId2")
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()

})