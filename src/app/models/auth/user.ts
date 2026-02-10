export interface User {
    id: number,
    username: string,
    email: string,
    role: "Employee" | "Manager",  
    avatarUrl?: string,
    createdAt: string
}
