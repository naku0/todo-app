import TodoItemInterface, {TodoItemWSchedule, ScheduleType} from "../types/todoItemInterface";
import {addScheduleToTodo} from "./useScheduleCalculator";

/**
 * Priority order for schedule types (lower = more urgent)
 */

const urgencyOrder: Record<ScheduleType, number> = {
    overdue: 0, //highest
    today: 1,
    tomorrow: 2,
    week: 3,
    month: 4,
    later: 5,   //lowest
};

/**
 * Filters and sorts todos based on multiple criteria
 *
 * @param todos - Array of todo items to filter
 * @param filters - Configuration object containing:
 *   - showCompleted: boolean - Include completed todos
 *   - priority: number|null - Filter by specific priority
 *   - tags: string[] - Filter by tags (empty array = any tag)
 *   - scheduleTypes: ScheduleType[] - Filter by schedule type
 *   - searchQuery: string - Filter by text content
 *
 * @returns Filtered and urgency-sorted todos with schedule info
 */
export const useTodosWithFilters = (
    todos: TodoItemInterface[],
    filters: {
        showCompleted: boolean;
        priority: number | null;
        tags: string[];
        scheduleTypes: ScheduleType[];
        searchQuery: string;
    }
): TodoItemWSchedule[] => {
    const {showCompleted, priority, tags, scheduleTypes, searchQuery} = filters;

    const scheduledTodos: TodoItemWSchedule[] = todos.map(todo => addScheduleToTodo(todo));

    const sortedTodos = [...scheduledTodos].sort((a, b) => {
        const aUrgency = urgencyOrder[a.schedule];
        const bUrgency = urgencyOrder[b.schedule];
        return aUrgency - bUrgency;
    });

    return sortedTodos.filter((todo) => {
        const matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCompleted = showCompleted || !todo.completed;
        const matchesPriority = priority === null || todo.priority === priority;
        const matchesTags = tags.length === 0 || tags.some(tag => todo.tags.includes(tag));
        const matchesSchedule = scheduleTypes.length === 0 || scheduleTypes.includes(todo.schedule);

        return matchesCompleted && matchesPriority && matchesTags && matchesSchedule && matchesSearch;
    });
};