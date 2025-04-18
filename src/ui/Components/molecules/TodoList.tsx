import {useEffect, useMemo} from "react";

import {useTodosWithFilters} from "../../../core/Hooks/useTodosWithFilters";
import {useFilters} from "../../../core/Hooks/useFilters";
import TodoItem from "../atoms/TodoItem";
import TodoEditorWindow from "../molecules/TodoEditorWindow";
import {useTodoStore} from "../../../storage/zustandStores/ZustandStoreInterface";
import {useEditorStore} from "../../../storage/zustandStores/EditorStore";
import {FilterDropdown} from "./FilterDropdown";
import SearchBar from "../atoms/SearchBar";

import "../../css/todo-list.css"
import Button from "../atoms/Button";

const TodoList = () => {
    const {todos, load} = useTodoStore();
    const {isOpen, mode, todoId, close, open} = useEditorStore();
    const {filters, updateFilter} = useFilters();

    useEffect(() => {
        load();
    }, [load]);

    const availableTags = useMemo(() => {
        const tags = new Set<string>();
        todos.forEach(todo => todo.tags.forEach(tag => tags.add(tag)));
        return Array.from(tags);
    }, [todos]);

    const availablePriorities = useMemo(() => {
        const priorities = new Set<number>();
        todos.forEach(todo => priorities.add(todo.priority));
        return Array.from(priorities).sort();
    }, [todos]);

    const filteredTodos = useTodosWithFilters(todos, filters);

    return (
        <>
            <div className="todo-controls">
                <div>
                    <SearchBar
                        onSearch={(query) => updateFilter("searchQuery", query)}
                    />
                </div>

                <div>
                    <Button text="Add Item" fun={() => open('create')}/>
                </div>

                <FilterDropdown
                    filters={filters}
                    availableTags={availableTags}
                    availablePriorities={availablePriorities}
                    onFilterChange={(newFilters) => {
                        Object.entries(newFilters).forEach(([key, value]) => {
                            updateFilter(key as keyof typeof newFilters, value);
                        });
                    }}
                />
            </div>

            <ul className="todo-list">
                {filteredTodos.length === 0 ? (
                    <div className="empty-message">Tasks not found, update filters or add tasks.</div>
                ) : (
                    filteredTodos.map((todo) => (
                        <li key={todo.id}>
                            <TodoItem data={todo}/>
                        </li>
                    ))
                )}
            </ul>

            {isOpen && <TodoEditorWindow {...{mode, todoId, onClose: close}} />}
        </>
    );
};

export default TodoList;