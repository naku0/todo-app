import {calculateSchedule} from "../BuisnessLogic/dateHelper";
import TodoItemInterface, {TodoItemWSchedule} from "../types/todoItemInterface";

/**
 * Adds schedule classification to a todo item
 *
 * @param todo - The base todo item to extend
 * @returns Enhanced todo with schedule information
 *
 * @notes
 * - Uses `calculateSchedule` for items with deadlines
 * - Defaults to "later" for items without deadlines
 */
export const addScheduleToTodo = (todo: TodoItemInterface): TodoItemWSchedule => ({
    ...todo,
    schedule: todo.deadline ? calculateSchedule(todo.deadline) : "later"
});