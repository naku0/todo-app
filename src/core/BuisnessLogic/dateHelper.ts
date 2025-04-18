import {ScheduleType} from "../types/todoItemInterface";

/**
 * Calculates deadline urgency category based on current date
 *
 * @param deadline - ISO date string to evaluate
 * @returns ScheduleType classification:
 *   - "overdue" if deadline passed
 *   - "today" if due today
 *   - "tomorrow" if due tomorrow
 *   - "week" if due within 7 days
 *   - "month" if due within 30 days
 *   - "later" if due beyond 30 days
 *
 * @note All dates are compared at midnight (00:00:00) to ignore time components
 */
export const calculateSchedule = (deadline: string): ScheduleType => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight

    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0); // Normalize to midnight

    const diffDays = Math.floor(
        (deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0) return "overdue";
    if (diffDays === 0) return "today";
    if (diffDays === 1) return "tomorrow";
    if (diffDays <= 7) return "week";
    if (diffDays <= 30) return "month";
    return "later";
};