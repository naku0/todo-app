import { useState } from "react";
import { ScheduleType } from "../types/todoItemInterface";
/**
 * Filter configuration for todos
 */
export type TodoFilter = {
    showCompleted: boolean;    // Whether to show completed todos
    priority: number | null;  // Priority filter (null = any priority)
    tags: string[];           // Tags to filter by (empty = any tag)
    scheduleTypes: ScheduleType[]; // Deadline categories to include
    searchQuery: string;      // Text search filter
};

/**
 * Manages todo filter state with update helpers
 *
 * @param initialFilters - Optional partial filter configuration
 * @returns Filter controls including:
 *   - filters: Current filter state
 *   - updateFilter: Generic updater
 *   - toggleCompleted: Toggle completed filter
 *   - setPriority: Update priority filter
 *   - setTags: Update tag filters
 *   - setScheduleTypes: Update deadline filters
 */
export const useFilters = (initialFilters?: Partial<TodoFilter>) => {
    const [filters, setFilters] = useState<TodoFilter>({
        showCompleted: true,
        priority: null,
        tags: [],
        scheduleTypes: [],
        searchQuery: "",
        ...initialFilters,
    });

    // Generic filter property updater
    const updateFilter = <K extends keyof TodoFilter>(key: K, value: TodoFilter[K]) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return {
        filters,
        updateFilter,
        toggleCompleted: () => updateFilter("showCompleted", !filters.showCompleted),
        setPriority: (priority: number | null) => updateFilter("priority", priority),
        setTags: (tags: string[]) => updateFilter("tags", tags),
        setScheduleTypes: (types: ScheduleType[]) => updateFilter("scheduleTypes", types),
    };
};