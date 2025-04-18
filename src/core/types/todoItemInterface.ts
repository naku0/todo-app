// shows when will be deadline
export type ScheduleType =  "today" | "tomorrow" | "week" | "month" | "later" | "overdue";

export default interface TodoItemInterface {
    id: string,                 // id for changing/deleting
    text: string,               //text of todo-elem
    completed: boolean,         // flag
    creationDateMark: string,   // there is string, 'cause Date object is mutable and can cause bags
    deadline: string,           // same here
    priority: number,
    tags: string[],             //array of tags
}

/**
 * Todo item extended with schedule classification
 */
export interface TodoItemWSchedule extends TodoItemInterface {
    schedule: ScheduleType;  // When the item is due
}