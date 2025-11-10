export interface TaskData {
    id: string,
    text: string,
    columnId: string
}

export interface ColumnData {
    id: string,
    title: string,
    tasks: TaskData[]
}