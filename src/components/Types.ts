export type PropsType = {
    todolistId: string
    title: string
    task: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (todolistId:string, value: FilterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = "all" | "active" | "completed"

export type TodolistsType = {
    id: string,
    title: string,
    filter: string
}