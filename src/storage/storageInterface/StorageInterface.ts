import TodoItemInterface from "../../core/types/todoItemInterface";

type TodoMap = Record<string, TodoItemInterface>;

/**
 * Helps work with browser storage (localStorage) for todo items.
 * All methods are static - use directly without creating class instance.
 */
export default class StorageInterface {
    // Key used to store todos in localStorage
    private static STORAGE_KEY = 'todos';

    /**
     * Gets all todo items from storage
     * @returns Object with all todos (key=id, value=todo item)
     */
    static getAll(): TodoMap {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : {}
    }

    /**
     * Finds one todo item by its ID
     * @param id - ID of todo item to find
     * @returns Todo item or null if not found
     */
    static getById(id: string): TodoItemInterface | null {
        const todos = this.getAll();
        return todos[id] || null
    }

    /**
     * Saves all todos to storage
     * @param todos - Complete list of todos to save
     */
    static saveAll(todos: TodoMap): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
    }

    /**
     * Creates new todo item and saves it
     * @param todo - Todo data (without ID)
     * @returns Newly created todo (with generated ID)
     */
    static addTodo(todo: Omit<TodoItemInterface, 'id'>): TodoItemInterface {
        const todos = this.getAll();
        const newTodo = {
            ...todo,
            id: crypto.randomUUID(),
            creationDateMark: new Date().toISOString()
        };
        todos[newTodo.id] = newTodo;
        this.saveAll(todos);
        return newTodo;
    }

    /**
     * Updates existing todo item
     * @param id - ID of todo to update
     * @param changes - New values to apply
     * @returns Updated todo or null if ID not found
     */
    static updateTodo(id: string, changes: Partial<TodoItemInterface>) {
        const todos = this.getAll();
        if (!todos[id]) return null;
        const updatedTodo = {...todos[id], ...changes}
        todos[id] = updatedTodo;
        this.saveAll(todos);
        return updatedTodo;
    }

    /**
     * Removes todo item from storage
     * @param id - ID of todo to delete
     */
    static deleteTodo(id: string): void {
        const todos = this.getAll();
        delete todos[id];
        this.saveAll(todos);
    }
}