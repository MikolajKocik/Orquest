import { User } from "../auth/user";
import { TaskAttachment } from "./task-attachment";
 
export interface CanbanTask {
    id: number,
    name: string,
    assignedTo?: User,
    priority: "Low" | "Medium" | "High",
    type: "Todo" | "In process" | "Done",
    attachments?: (TaskAttachment | File)[],
    description: string
}
