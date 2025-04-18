import {useState} from "react";
import {ScheduleType} from "../../../core/types/todoItemInterface";
import {ReactComponent as Up} from "../../../utils/assets/up.svg";
import {ReactComponent as Down} from "../../../utils/assets/down.svg";

/**
 * Props for FilterDropdown component
 * @param filters - Current filter values
 * @param availableTags - List of available tags for filtering
 * @param availablePriorities - List of available priority levels
 * @param onFilterChange - Callback when filters are modified
 */
type FilterDropdownProps = {
    filters: {
        showCompleted: boolean;
        priority: number | null;
        tags: string[];
        scheduleTypes: ScheduleType[];
    };
    availableTags: string[];
    availablePriorities: number[];
    onFilterChange: (newFilters: {
        showCompleted: boolean;
        priority: number | null;
        tags: string[];
        scheduleTypes: ScheduleType[];
    }) => void;
};

// Mapping of schedule types to human-readable labels
const scheduleLabels: Record<ScheduleType, string> = {
    overdue: "Overdue",
    today: "Today",
    tomorrow: "Tomorrow",
    week: "This week",
    month: "This month",
    later: "Later"
};

/**
 * Interactive filter dropdown component
 * - Toggle visibility of completed items
 * - Filter by priority level
 * - Filter by tags
 * - Filter by deadline urgency
 * - Collapsible/expandable panel
 */
export const FilterDropdown = ({
                                   filters,
                                   availableTags,
                                   availablePriorities,
                                   onFilterChange
                               }: FilterDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleScheduleFilter = (type: ScheduleType) => {
        const newScheduleTypes = filters.scheduleTypes.includes(type)
            ? filters.scheduleTypes.filter(t => t !== type)
            : [...filters.scheduleTypes, type];
        onFilterChange({...filters, scheduleTypes: newScheduleTypes});
    };

    const toggleTagFilter = (tag: string) => {
        const newTags = filters.tags.includes(tag)
            ? filters.tags.filter(t => t !== tag)
            : [...filters.tags, tag];
        onFilterChange({...filters, tags: newTags});
    };

    const togglePriorityFilter = (priority: number) => {
        onFilterChange({
            ...filters,
            priority: filters.priority === priority ? null : priority
        });
    };

    return (
        <div className="filter-dropdown">
            <button
                className="filter-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls="filter-panel"
            >
                <p>Filters {isOpen ? <Up/> : <Down/>}</p>
            </button>

            {isOpen && (
                <div id="filter-panel" className="filter-panel">
                    {/* Completion status filter */}
                    <fieldset className="filter-group">
                        <legend>Status</legend>
                        <label>
                            <input
                                type="checkbox"
                                checked={filters.showCompleted}
                                onChange={() => onFilterChange({
                                    ...filters,
                                    showCompleted: !filters.showCompleted
                                })}
                            />
                            Show completed
                        </label>
                    </fieldset>

                    {/* Priority filter */}
                    <fieldset className="filter-group">
                        <legend>Priority</legend>
                        {availablePriorities.map(p => (
                            <label key={p}>
                                <input
                                    type="radio"
                                    name="priority"
                                    checked={filters.priority === p}
                                    onChange={() => togglePriorityFilter(p)}
                                />
                                {p !== 0 ? `Priority ${p}` : "No priority"}
                            </label>
                        ))}
                        <label>
                            <input
                                type="radio"
                                name="priority"
                                checked={filters.priority === null}
                                onChange={() => onFilterChange({
                                    ...filters,
                                    priority: null
                                })}
                            />
                            Any priority
                        </label>
                    </fieldset>

                    {/* Tags filter */}
                    <fieldset className="filter-group">
                        <legend>Tags</legend>
                        {availableTags.map(tag => (
                            <label key={tag}>
                                <input
                                    type="checkbox"
                                    checked={filters.tags.includes(tag)}
                                    onChange={() => toggleTagFilter(tag)}
                                />
                                {tag}
                            </label>
                        ))}
                    </fieldset>

                    {/* Deadline urgency filter */}
                    <fieldset className="filter-group">
                        <legend>Due Date</legend>
                        {(Object.keys(scheduleLabels) as ScheduleType[]).map(type => (
                            <label key={type}>
                                <input
                                    type="checkbox"
                                    checked={filters.scheduleTypes.includes(type)}
                                    onChange={() => toggleScheduleFilter(type)}
                                />
                                {scheduleLabels[type]}
                            </label>
                        ))}
                    </fieldset>
                </div>
            )}
        </div>
    );
};