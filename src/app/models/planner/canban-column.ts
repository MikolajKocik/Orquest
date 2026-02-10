import { CanbanTask } from "./canban-task"

export interface CanbanColumn {
    id: string,
    name: string,
    tasks: CanbanTask[]
}
